"use client";
import React, {
    useEffect,
    useRef,
    useCallback,
    useImperativeHandle,
    forwardRef
} from 'react';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { PieChartData } from "@/types/general";
import { exportChartDataToExcel } from "@/utils/chart/exportChartDataUtils";
import jsPDF from 'jspdf';
import am5locales_vi_VN from "@amcharts/amcharts5/locales/vi_VN";

// 1. Định nghĩa một "handle" type cho các hàm bạn muốn lộ ra ngoài
export interface PieChartHandle {
    exportToExcel: () => Promise<void>;
    exportToPdf: () => void;
    printChart: () => void;
}

interface ChartComponentProps {
    data: PieChartData[];
    chartId?: string;
    fileName?: string;
    title?: string;
    tableData?: any[];
    tableColumns?: { header: string; key: string; width?: number }[];
    // Prop `exportRef` đã được loại bỏ
}

// 2. Bọc component bằng `forwardRef` để nhận ref từ component cha
const PieChartComponent = forwardRef<PieChartHandle, ChartComponentProps>(({
                                                                               data,
                                                                               chartId = "chartdiv",
                                                                               fileName = "BaoCaoThongKe",
                                                                               title = "Báo cáo thống kê",
                                                                               tableData,
                                                                               tableColumns,
                                                                           }, ref) => {
    const chartRef = useRef<am5.Root | null>(null);
    const exportingRef = useRef<am5plugins_exporting.Exporting | null>(null);

    // 3. Đưa các hàm xử lý logic ra ngoài và bọc bằng `useCallback` để tối ưu hóa
    const exportToExcel = useCallback(async () => {
        if ((!data || data.length === 0) && (!tableData || tableData.length === 0)) {
            console.warn("Không có dữ liệu để xuất.");
            return;
        }
        try {
            if (tableData && tableData.length > 0 && tableColumns && tableColumns.length > 0) {
                await exportChartDataToExcel({
                    data: tableData,
                    columns: tableColumns,
                    fileName: `${fileName}.xlsx`,
                    sheetName: 'Báo cáo',
                    title,
                });
            } else {
                const columns = [
                    { header: 'Danh mục', key: 'category', width: 40 },
                    { header: 'Giá trị', key: 'value', width: 15 },
                    { header: 'Phần trăm', key: 'percentage', width: 15 }
                ];
                const totalValue = data.reduce((sum, item) => sum + item.value, 0);
                const dataWithPercentage = data.map(item => ({
                    ...item,
                    percentage: totalValue > 0 ? `${((item.value / totalValue) * 100).toFixed(2)}%` : '0.00%'
                }));
                await exportChartDataToExcel({
                    data: dataWithPercentage,
                    columns,
                    fileName: `${fileName}.xlsx`,
                    sheetName: 'Báo cáo',
                    title,
                });
            }
        } catch (error) {
            console.error("Lỗi khi xuất dữ liệu Excel:", error);
        }
    }, [data, tableData, tableColumns, fileName, title]);

    const exportToPdf = useCallback(() => {
        const exporting = exportingRef.current;
        if (!exporting) {
            console.error("Plugin exporting chưa sẵn sàng.");
            return;
        }
        exporting.export("png", {}).then((data) => {
            const img = new Image();
            img.onload = () => {
                const pdf = new jsPDF('landscape', 'mm', 'a4');
                const pdfWidth = 297;
                const pdfHeight = 210;
                const ratio = Math.min((pdfWidth - 20) / img.width, (pdfHeight - 40) / img.height);
                const finalWidth = img.width * ratio;
                const finalHeight = img.height * ratio;
                const x = (pdfWidth - finalWidth) / 2;
                const y = 30;

                pdf.addFont('/fonts/open-sans/OpenSans-Regular.ttf', 'OpenSans', 'normal');
                pdf.setFont('OpenSans');
                if (title) {
                    pdf.setFontSize(16);
                    pdf.text(title, pdfWidth / 2, 15, { align: 'center' });
                }
                pdf.addImage(img.src, 'PNG', x, y, finalWidth, finalHeight);
                pdf.save(`${fileName}.pdf`);
            };
            img.src = data;
        }).catch(err => console.error("Lỗi khi xuất PDF:", err));
    }, [fileName, title]);

    const printChart = useCallback(() => {
        const exporting = exportingRef.current;
        if (!exporting) {
            console.error("Plugin exporting chưa sẵn sàng.");
            return;
        }
        exporting.export("png", {}).then((data) => {
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                alert("Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt chặn pop-up của trình duyệt.");
                return;
            }
            printWindow.document.write(`
                <!DOCTYPE html>
                <html><head><title>${title}</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: sans-serif; }
                    img { width: 100%; max-width: 100%; height: auto; }
                    @media print { body { padding: 0; } }
                </style>
                </head><body>
                <h1 style="text-align:center;">${title}</h1>
                <img src="${data}" />
                <script>
                    setTimeout(() => { window.print(); setTimeout(window.close, 300); }, 500);
                </script>
                </body></html>`);
            printWindow.document.close();
        }).catch(err => console.error("Lỗi khi chuẩn bị in:", err));
    }, [title]);

    // 4. Sử dụng `useImperativeHandle` để gán các hàm vào `ref`
    useImperativeHandle(ref, () => ({
        exportToExcel,
        exportToPdf,
        printChart,
    }), [exportToExcel, exportToPdf, printChart]);

    useEffect(() => {
        const root = am5.Root.new(chartId);
        chartRef.current = root;
        root.locale = am5locales_vi_VN;
        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout
        }));

        const series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            tooltipText: "{category}: {value} ({valuePercentTotal.formatNumber('#.00')}%)",
            radius: am5.percent(80)
        }));



        series.labels.template.setAll({
            oversizedBehavior: "wrap",
            maxWidth: 120,
            text: "{category}\n({valuePercentTotal.formatNumber('#.00')}%)"
        });
        series.data.setAll(data);

        const legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15,
            maxWidth: am5.percent(95) as any,
            maxHeight: am5.percent(25) as any,
            nameField: "category"
        }));
        legend.labels.template.setAll({ oversizedBehavior: "wrap", maxWidth: 200 });
        legend.valueLabels.template.set("forceHidden", true);
        legend.data.setAll(series.dataItems);

        const exporting = am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            filePrefix: fileName,
        });
        exportingRef.current = exporting;

        // Cấu hình menu với các hàm đã được định nghĩa ở trên
        const menu = exporting.get("menu");
        if (menu) {
            menu.set("items", [
                { type: "custom", label: "Tải xuống Excel", callback: exportToExcel },
                { type: "custom", label: "Tải xuống PDF (A4)", callback: exportToPdf },
                { type: "custom", label: "In biểu đồ", callback: printChart }
            ]);
        }

        series.appear(1000, 100);
        if (root._logo) {
            root._logo.set("forceHidden", true); // Safely hide the logo
        }


        return () => {
            if (chartRef.current) {
                chartRef.current.dispose();
                chartRef.current = null;
            }
        };
        // 5. Loại bỏ useEffect thứ hai và cập nhật dependencies cho useEffect chính
    }, [data, chartId, fileName, title, exportToExcel, exportToPdf, printChart]);

    return (
        <div className="chart-container">
            <div id={chartId} style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
});

// Thêm display name để dễ debug trong React DevTools
PieChartComponent.displayName = 'PieChartComponent';

export default PieChartComponent;