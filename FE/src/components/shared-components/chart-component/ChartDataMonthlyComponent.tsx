"use client";
import React, {useLayoutEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import {ChartDataMonthlyDto} from "@/types/general";
import {exportChartDataToExcel} from "@/utils/chart/exportChartDataUtils"; // Import the export utility
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import jsPDF from 'jspdf';
import am5locales_vi_VN from "@amcharts/amcharts5/locales/vi_VN"; // Import jsPDF for custom PDF export

interface ChartDataMonthlyComponentProps {
    data: ChartDataMonthlyDto[];
    chartId: string;
    fileName?: string; // For Excel export
    title?: string;    // For Excel export title
    reportDateText?: string; // Optional: For displaying a date string in the export
    tableData?: any[]; // Optional table data for Excel export
    tableColumns?: { header: string; key: string; width?: number; align?: 'left' | 'center' | 'right' }[]; // Optional table columns configuration
}

const ChartDataMonthlyComponent: React.FC<ChartDataMonthlyComponentProps> = ({
                                                                                 data,
                                                                                 chartId,
                                                                                 fileName = "MonthlyReport",
                                                                                 title = "Monthly Data Report",
                                                                                 reportDateText,
                                                                                 tableData,
                                                                                 tableColumns
                                                                             }) => {
    const chartRef = useRef<am5.Root | null>(null);

    // Tính tổng số (tổng tất cả các giá trị start và end)
    data.reduce((sum, d) => sum + (d.start || 0) + (d.end || 0), 0);
    useLayoutEffect(() => {
        // Prepare full list of months
        const allMonths = Array.from({length: 12}, (_, i) => `Tháng ${i + 1}`);
        // Merge data to ensure all months are present
        const mergedData = allMonths.map(month => {
            const found = data.find(d => d.month === month);
            return found ? found : {month, start: 0, end: 0};
        });

        // Chỉ tạo biểu đồ nếu có dữ liệu
        if (data && data.length > 0) {
            // Dispose chart khi component unmount
            const root = am5.Root.new(chartId);
            chartRef.current = root;

            // Set themes
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            root.locale = am5locales_vi_VN;

            // Create chart
            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                paddingLeft: 0,
                layout: root.verticalLayout
            }));

            // Add legend
            const legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50)
            }));

            // Add exporting plugin
            const exporting = am5plugins_exporting.Exporting.new(root, {
                menu: am5plugins_exporting.ExportingMenu.new(root, {}),
                filePrefix: fileName, // Use the fileName prop here
                pdfOptions: { // Example for other formats if needed
                    maintainPixelRatio: true,
                    quality: 1,
                    pageOrientation: "landscape", // Landscape orientation
                    pageSize: "A4", // A4 paper size
                    pageMargins: [10, 10, 10, 10], // Smaller margins to maximize chart space
                    addURL: false, // Remove the URL from the bottom
                    // Custom PDF styling for centering content and larger size
                    fontSize: 12,
                    minWidth: 842, // A4 landscape width in points
                    minHeight: 595, // A4 landscape height in points
                    maxWidth: 842,
                    maxHeight: 595,

                }
            });

            // Custom export to Excel
            const handleExportExcel = () => {
                // If custom table data and columns are provided, use them
                if (tableData && tableData.length > 0 && tableColumns && tableColumns.length > 0) {
                    void exportChartDataToExcel({
                        data: tableData,
                        columns: tableColumns,
                        fileName: `${fileName}.xlsx`,
                        sheetName: 'Báo cáo',
                        title: title,
                        reportDate: reportDateText,
                        onSuccess: () => console.log("Xuất Excel thành công!"),
                        onError: (error) => console.error("Lỗi khi xuất Excel:", error),
                    });
                } else {
                    // Default chart data export if no table data provided
                    const columns = [
                        {header: 'Tháng', key: 'month', width: 15},
                        {header: 'Đợt bắt đầu', key: 'start', width: 20},
                        {header: 'Đợt kết thúc', key: 'end', width: 20},
                    ];

                    void exportChartDataToExcel({
                        data: data,
                        columns: columns,
                        fileName: fileName,
                        sheetName: 'Dữ liệu hàng tháng',
                        title: title,
                        reportDate: reportDateText, // Use the passed prop or generate one
                        onSuccess: () => console.log("Xuất Excel thành công!"),
                        onError: (error) => console.error("Lỗi khi xuất Excel:", error),
                    });
                }
            };

            // Custom export to PDF with A4 size
            const handleExportPDF = () => {
                // Lấy canvas của chart để xuất ra PDF
                const canvas = document.querySelector(`#${chartId} canvas`) as HTMLCanvasElement;
                if (canvas) {
                    // Đảm bảo nền trắng trước khi xuất
                    exporting.export("png", {}).then((data) => {
                        // Tạo một Image element để kết xuất dữ liệu PNG từ export
                        const img = new Image();
                        img.onload = () => {
                            // Tính toán kích thước để vừa với trang A4
                            // A4 landscape: 297mm x 210mm
                            const pdfWidth = 297;
                            const pdfHeight = 210;

                            // Tính toán kích thước hình ảnh để vừa với trang A4
                            const imgWidth = img.width;
                            const imgHeight = img.height;

                            // Tính toán tỷ lệ để hình ảnh vừa với trang A4
                            const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 40) / imgHeight); // Để lại margin

                            // Kích thước cuối cùng của hình ảnh trên PDF
                            const finalWidth = imgWidth * ratio;
                            const finalHeight = imgHeight * ratio;

                            // Tính vị trí để căn giữa hình ảnh
                            const x = (pdfWidth - finalWidth) / 2;
                            const y = 30; // Để lại khoảng cho tiêu đề

                            // Tạo file PDF với font hỗ trợ Unicode (tiếng Việt)
                            const pdf = new jsPDF('landscape', 'mm', 'a4');

                            // Thêm font hỗ trợ tiếng Việt (sử dụng font mặc định với encoding UTF-8)
                            pdf.addFont('/fonts/open-sans/OpenSans-Regular.ttf', 'OpenSans', 'normal');
                            pdf.setFont('OpenSans');

                            // Thêm tiêu đề nếu có
                            if (title) {
                                pdf.setFont('OpenSans');
                                pdf.setFontSize(16);
                                pdf.text(title, pdfWidth / 2, 15, {align: 'center'});
                            }

                            // Thêm hình ảnh vào PDF
                            pdf.addImage(img.src, 'PNG', x, y, finalWidth, finalHeight);

                            // Thêm ngày báo cáo nếu có
                            if (reportDateText) {
                                pdf.setFont('OpenSans');
                                pdf.setFontSize(10);
                                pdf.text(reportDateText, pdfWidth / 2, pdfHeight - 10, {align: 'center'});
                            }

                            // Lưu file PDF
                            pdf.save(`${fileName || 'chart'}.pdf`);
                        };

                        // Chuyển dữ liệu base64 thành source cho image
                        img.src = data;
                    }).catch(err => {
                        console.error("Error exporting chart:", err);
                    });
                }
            };



            // Configure export menu
            const menu = exporting.get("menu");
            if (menu) {
                // Add custom Excel and PDF export options
                menu.set("items", [
                    {
                        type: "custom",
                        label: "Tải xuống Excel",
                        callback: handleExportExcel
                    },
                    {
                        type: "custom",
                        label: "Tải xuống PDF (A4)",
                        callback: handleExportPDF
                    }
                ]);
            }

            // Create axes
            const xRenderer = am5xy.AxisRendererX.new(root, {
                cellStartLocation: 0,
                cellEndLocation: 1,
                minorGridEnabled: true,
                minGridDistance: 10 // Đảm bảo các nhãn không bị cách xa
            });

            // Configure X-axis labels for better visibility
            xRenderer.labels.template.setAll({
                rotation: -45, // Rotate labels to -45 degrees
                centerX: am5.p100, // Anchor point for rotation (right edge of label)
                maxWidth: 80 // Max width before truncating (adjust as needed)
            });

            const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "month",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            }));
            // Set categories to all 12 months (always show 12 months)
            xAxis.data.setAll(mergedData);

            xRenderer.grid.template.setAll({
                location: 0
            });

            // Remove duplicate setAll
            // xAxis.data.setAll(mergedData);

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 1
                })
            }));

            if (root._logo) {
                root._logo.set("forceHidden", true); // Safely hide the logo
            }
            // Add series
            function makeSeries(name: string, fieldName: string, stacked: boolean, color: number) {
                const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    stacked: stacked,
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: "month"
                }));

                series.columns.template.setAll({
                    tooltipText: "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}",
                    width: am5.percent(90),
                    tooltipY: am5.percent(10),
                    fill: am5.color(color)
                });

                // Always use mergedData for series
                series.data.setAll(mergedData);

                // Make stuff animate on load
                series.appear();

                // Add label bullet (hiển thị giá trị trong cột)
                series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        locationY: 0.5, // Anchor bullet at the center of the column segment
                        sprite: am5.Label.new(root, {
                            text: "{valueY}", // Show the value of the current segment only
                            fill: am5.color(0xffffff), // White text for better visibility
                            centerX: am5.percent(50), // Center horizontally
                            centerY: am5.percent(50), // Center vertically
                            populateText: true,
                            fontSize: 16
                        })
                    });
                });

                legend.data.push(series);

                return series;
            }

            // Tạo các chuỗi dữ liệu xếp chồng lên nhau trong cùng một cột
            makeSeries("Đợt bắt đầu", "start", true, 0x3182bd); // Blue
            makeSeries("Đợt kết thúc", "end", true, 0xe6550d);  // Orange

            // Tính tổng từng tháng và thêm vào dữ liệu
            const totalsByMonth = mergedData.map(item => ({
                month: item.month,
                start: item.start || 0,
                end: item.end || 0,
                total: (item.start || 0) + (item.end || 0),
                none: 0 // field này chỉ dùng để hiển thị tổng, không có giá trị thực
            }));

            // Create series for total
            const totalSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Total",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "none",
                categoryXField: "month",
                stacked: true,
            }));

            // Set data
            totalSeries.data.setAll(totalsByMonth);

            // Make columns invisible
            totalSeries.columns.template.setAll({
                strokeOpacity: 0,
                fillOpacity: 0
            });

            // Add bullet label for total
            totalSeries.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0, // Đặt ở trên cùng
                    sprite: am5.Label.new(root, {
                        text: "{total}", // Hiển thị giá trị total
                        centerX: am5.percent(50),
                        centerY: am5.percent(0),
                        populateText: true,
                        fontSize: 14, // Tăng kích thước font
                        fontWeight: "bold",
                        fill: am5.color(0x000000), // Màu đen
                        background: am5.RoundedRectangle.new(root, {
                            fill: am5.color(0xFFDA7A), // Màu vàng nhạt, dễ nhìn
                            fillOpacity: 0.9, // Tăng độ đậm để nổi bật hơn
                            cornerRadiusTL: 5,
                            cornerRadiusTR: 5,
                            cornerRadiusBL: 5,
                            cornerRadiusBR: 5,
                        }),
                        dy: -40 // Điều chỉnh vị trí lên cao hơn
                    })
                });
            });

            void chart.appear(1000, 100);

            // Disable the amCharts logo
            if (root._logo) {
                root._logo.set("disabled", true);
            }
        }

        return () => {
            // Dọn dẹp khi component unmount
            if (chartRef.current) {
                chartRef.current.dispose();
            }
        };
    }, [chartId, data, fileName, reportDateText, title]); // Added missing dependencies

    return (
        <div>
            <div id={chartId} style={{width: "100%", height: "400px"}}/>
        </div>
    );
};

export default ChartDataMonthlyComponent;
