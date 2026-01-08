"use client";
import React, {useLayoutEffect, useRef} from 'react';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import jsPDF from 'jspdf';
import am5locales_vi_VN from "@amcharts/amcharts5/locales/vi_VN";
import {exportChartDataToExcel} from "@/utils/chart/exportChartDataUtils";

// Define the data structure for the chart
interface DataItem {
    [key: string]: string | number;
}

interface SeriesConfig {
    name: string;
    field: string;
    color?: number;
}

interface HorizontalStackedBarChartProps {
    data: DataItem[];
    series: SeriesConfig[];
    chartId: string;
    categoryField?: string;
    fileName?: string;
    title?: string;
    reportDateText?: string;
    tableColumns?: { header: string; key: string; width?: number; align?: 'left' | 'center' | 'right' }[];
    tableData?: any[];
}

const HorizontalStackedBarChart: React.FC<HorizontalStackedBarChartProps> = ({
                                                                                 data,
                                                                                 series,
                                                                                 chartId,
                                                                                 categoryField = "year",
                                                                                 fileName = "HorizontalStackedBarChart",
                                                                                 title = "Horizontal Stacked Bar Chart",
                                                                                 reportDateText,
                                                                                 tableColumns,
                                                                                 tableData
                                                                             }) => {
    const chartRef = useRef<am5.Root | null>(null);

    useLayoutEffect(() => {
        // Only create chart if there's data
        if (data && data.length > 0) {
            // Dispose root element if it exists
            if (chartRef.current) {
                chartRef.current.dispose();
            }

            // Create root element
            const root = am5.Root.new(chartId);
            chartRef.current = root;

            // Set locale
            root.locale = am5locales_vi_VN;

            // Create custom theme
            const myTheme = am5.Theme.new(root);
            myTheme.rule("Grid", ["base"]).setAll({
                strokeOpacity: 0.1
            });

            // Set themes
            root.setThemes([
                am5themes_Animated.new(root),
                myTheme
            ]);

            // Create chart
            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panY",
                wheelY: "zoomY",
                paddingLeft: 0,
                layout: root.verticalLayout
            }));

            // Add scrollbar for vertical scrolling if many categories
            chart.set("scrollbarY", am5.Scrollbar.new(root, {
                orientation: "vertical"
            }));

            // Create axes
            const yRenderer = am5xy.AxisRendererY.new(root, {});
            const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: categoryField,
                renderer: yRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            yRenderer.grid.template.setAll({
                location: 1
            });

            yAxis.data.setAll(data);

            const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                min: 0,
                maxPrecision: 0,
                renderer: am5xy.AxisRendererX.new(root, {
                    minGridDistance: 40,
                    strokeOpacity: 0.1
                })
            }));

            // Add legend
            const legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            }));

            // Add exporting plugin
            const exporting = am5plugins_exporting.Exporting.new(root, {
                menu: am5plugins_exporting.ExportingMenu.new(root, {}),
                filePrefix: fileName,
                pdfOptions: {
                    maintainPixelRatio: true,
                    quality: 1,
                    pageOrientation: "landscape",
                    pageSize: "A4",
                    pageMargins: [10, 10, 10, 10],
                    addURL: false,
                    fontSize: 12,
                    minWidth: 842,
                    minHeight: 595,
                    maxWidth: 842,
                    maxHeight: 595,
                }
            });

            // Custom export to Excel
            const handleExportExcel = () => {
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
                    // Default chart data export
                    const defaultColumns = [
                        {header: categoryField, key: categoryField, width: 15},
                        ...series.map(s => ({
                            header: s.name,
                            key: s.field,
                            width: 20
                        }))
                    ];

                    void exportChartDataToExcel({
                        data: data,
                        columns: defaultColumns,
                        fileName: `${fileName}.xlsx`,
                        sheetName: 'Dữ liệu',
                        title: title,
                        reportDate: reportDateText,
                        onSuccess: () => console.log("Xuất Excel thành công!"),
                        onError: (error) => console.error("Lỗi khi xuất Excel:", error),
                    });
                }
            };

            // Custom export to PDF with A4 size
            const handleExportPDF = () => {
                exporting.export("png", {}).then((data) => {
                    const img = new Image();
                    img.onload = () => {
                        // Calculate size to fit A4 landscape
                        const pdfWidth = 297;
                        const pdfHeight = 210;

                        const imgWidth = img.width;
                        const imgHeight = img.height;

                        const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 40) / imgHeight);
                        const finalWidth = imgWidth * ratio;
                        const finalHeight = imgHeight * ratio;

                        const x = (pdfWidth - finalWidth) / 2;
                        const y = 30;

                        const pdf = new jsPDF('landscape', 'mm', 'a4');

                        try {
                            pdf.addFont('/fonts/open-sans/OpenSans-Regular.ttf', 'OpenSans', 'normal');
                            pdf.setFont('OpenSans');
                        } catch (e) {
                            console.log("Font not available, using default", e);
                        }

                        if (title) {
                            pdf.setFontSize(16);
                            pdf.text(title, pdfWidth / 2, 15, {align: 'center'});
                        }

                        pdf.addImage(img.src, 'PNG', x, y, finalWidth, finalHeight);

                        if (reportDateText) {
                            pdf.setFontSize(10);
                            pdf.text(reportDateText, pdfWidth / 2, pdfHeight - 10, {align: 'center'});
                        }

                        pdf.save(`${fileName}.pdf`);
                    };

                    img.src = data;
                }).catch(err => {
                    console.error("Error exporting chart:", err);
                });
            };

            // Configure export menu
            const menu = exporting.get("menu");
            if (menu) {
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

            // Function to create series
            function makeSeries(name: string, fieldName: string, color?: number) {
                const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: name,
                    stacked: true,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    baseAxis: yAxis,
                    valueXField: fieldName,
                    categoryYField: categoryField
                }));

                series.columns.template.setAll({
                    tooltipText: "{name}, {categoryY}: {valueX}",
                    tooltipY: am5.percent(90),
                    fill: color !== undefined ? am5.color(color) : undefined
                });

                series.data.setAll(data);

                // Make stuff animate on load
                series.appear();

                series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        sprite: am5.Label.new(root, {
                            text: "{valueX}",
                            fill: root.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    });
                });

                legend.data.push(series);
            }

            if (root._logo) {
                root._logo.set("forceHidden", true); // Safely hide the logo
            }

            // Create series for each data field
            series.forEach(s => {
                makeSeries(s.name, s.field, s.color);
            });

            // Make chart appear with animation
            chart.appear(1000, 100);

            // Disable the amCharts logo
            if (root._logo) {
                root._logo.set("disabled", true);
            }
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.dispose();
            }
        };
    }, [chartId, data, series, categoryField, fileName, title, reportDateText, tableColumns, tableData]);

    return (
        <div>
            <div id={chartId} style={{width: "100%", height: "500px"}}/>
        </div>
    );
};

export default HorizontalStackedBarChart;
