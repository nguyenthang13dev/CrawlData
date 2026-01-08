"use client";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import type { AmChartRendererProps, ChartConfig } from "./types/Amchart";

const AmChartRenderer: React.FC<AmChartRendererProps> = ({
    chartType,
    chartData,
    chartConfig = {},
    categoryField = "category",
    valueField = "value",
    seriesField = "series",
    height = "500px",
    width = "100%",
    onChartReady,
    onError,
}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<am5.Root | null>(null);
    const chartInstanceRef = useRef<
        am5xy.XYChart | am5percent.PieChart | am5radar.RadarChart | null
    >(null);

    // Helper function to safely create color
    const createColor = useCallback(
        (colorValue: string | undefined): am5.Color | undefined => {
            if (!colorValue) return undefined;
            try {
                if (colorValue.startsWith("#")) {
                    return am5.color(colorValue);
                }
                if (colorValue.startsWith("0x")) {
                    return am5.color(Number.parseInt(colorValue, 16));
                }
                return am5.color(colorValue);
            } catch (error) {
                console.warn(`Invalid color value: ${colorValue}`, error);
                return undefined;
            }
        },
        [],
    );

    // Validation function
    const validateData = useCallback(
        (data: any[], type: string): boolean => {
            if (!data || !Array.isArray(data) || data.length === 0) {
                onError?.(new Error("Invalid or empty chartData"));
                return false;
            }

            const firstItem = data[0];

            switch (type) {
                case "bar":
                case "line":
                case "area":
                case "pie":
                case "stackedbar":
                case "radar":
                case "scatter":
                    if (
                        !firstItem[categoryField] ||
                        firstItem[valueField] === undefined
                    ) {
                        onError?.(
                            new Error(
                                `Missing required fields: ${categoryField} or ${valueField}`,
                            ),
                        );
                        return false;
                    }
                    break;
                default:
                    onError?.(new Error(`Unsupported chartType: ${type}`));
                    return false;
            }
            return true;
        },
        [categoryField, valueField, onError],
    );

    // Create pie chart
    const createPieChart = useCallback(
        (root: am5.Root, config: ChartConfig) => {
            const chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                    radius: config.radius
                        ? am5.percent(parseFloat(config.radius.toString()))
                        : undefined,
                    innerRadius: config.innerRadius
                        ? am5.percent(parseFloat(config.innerRadius.toString()))
                        : undefined,
                }),
            );
            const seriesConfig = config.series?.[0] || {};
            const fillColor = createColor(seriesConfig.fill);
            const series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField,
                    categoryField,
                    radius: seriesConfig.radius
                        ? am5.percent(
                              parseFloat(seriesConfig.radius.toString()),
                          )
                        : undefined,
                    innerRadius: seriesConfig.innerRadius
                        ? am5.percent(
                              parseFloat(seriesConfig.innerRadius.toString()),
                          )
                        : undefined,
                    name: seriesConfig.name || "Series",
                    ...(fillColor && { fill: fillColor }),
                }),
            );
            // Gán labels nếu có
            if (seriesConfig.labels) {
                series.labels.template.setAll(seriesConfig.labels);
            }

            // Gán ticks nếu có
            if (seriesConfig.ticks) {
                series.ticks.template.setAll(seriesConfig.ticks);
            }
            series.data.setAll(chartData);
            series.appear(
                config.appear?.duration || 1000,
                config.appear?.delay || 100,
            );

            // Add legend if configured
            if (config.legend) {
                const legend = chart.children.push(
                    am5.Legend.new(root, {
                        centerX: config.legend.centerX || am5.p50,
                        x: config.legend.x || am5.p50,
                        centerY: config.legend.centerY,
                        y: config.legend.y,
                    }),
                );
                legend.data.setAll(series.dataItems);
            }

            return chart;
        },
        [chartData, categoryField, valueField, createColor],
    );

    // Create radar chart
    const createRadarChart = useCallback(
        (root: am5.Root, config: ChartConfig) => {
            const chart = root.container.children.push(
                am5radar.RadarChart.new(root, {
                    radius: config.radius || am5.percent(80),
                    innerRadius: config.innerRadius || am5.percent(50),
                }),
            );

            // Create axes
            const xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    categoryField,
                    renderer: am5radar.AxisRendererCircular.new(root, {
                        radius: am5.percent(80),
                    }),
                }),
            );
            xAxis.data.setAll(chartData);

            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5radar.AxisRendererRadial.new(root, {}),
                }),
            );

            // Create series
            const seriesConfig = config.series?.[0] || {};
            const fillColor = createColor(seriesConfig.fill);

            const series = chart.series.push(
                am5radar.RadarLineSeries.new(root, {
                    name: seriesConfig.name || "Series",
                    xAxis,
                    yAxis,
                    valueYField: valueField,
                    categoryXField: categoryField,
                    ...(fillColor && { fill: fillColor }),
                    tooltip: am5.Tooltip.new(root, {
                        labelText:
                            seriesConfig.tooltip?.labelText ||
                            "{categoryX}: {valueY}",
                    }),
                }),
            );

            series.data.setAll(chartData);
            series.appear(config.appear?.duration || 1000);

            // Add cursor if configured
            if (config.cursor?.type === "RadarCursor") {
                chart.set("cursor", am5radar.RadarCursor.new(root, {}));
            }

            return chart;
        },
        [chartData, categoryField, valueField, createColor],
    );

    // Create XY chart (bar, line, area, scatter, stackedbar)
    // Create XY chart (bar, line, area, scatter, stackedbar)
    const createXYChart = useCallback(
        (root: am5.Root, config: ChartConfig) => {
            const chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panX: config.panX ?? true,
                    panY: config.panY ?? true,
                    wheelX: config.wheelX as
                        | "panX"
                        | "panY"
                        | "zoomX"
                        | "zoomY"
                        | "zoomXY"
                        | "panXY"
                        | "none"
                        | undefined,
                    wheelY: config.wheelY as
                        | "panX"
                        | "panY"
                        | "zoomX"
                        | "zoomY"
                        | "zoomXY"
                        | "panXY"
                        | "none"
                        | undefined,
                    pinchZoomX: config.pinchZoomX ?? true,
                    paddingLeft: config.paddingLeft ?? 0,
                }),
            );

            // Create X axis
            let xAxis:
                | am5xy.CategoryAxis<am5xy.AxisRenderer>
                | am5xy.ValueAxis<am5xy.AxisRenderer>;

            const xRenderer = am5xy.AxisRendererX.new(root, {
                minGridDistance:
                    config.xAxes?.[0]?.renderer?.minGridDistance || 80,
                minorGridEnabled:
                    config.xAxes?.[0]?.renderer?.minorGridEnabled ?? true,
                pan: config.xAxes?.[0]?.renderer?.pan || "zoom",
            });

            if (["bar", "line", "area", "stackedbar"].includes(chartType)) {
                xAxis = chart.xAxes.push(
                    am5xy.CategoryAxis.new(root, {
                        categoryField,
                        renderer: xRenderer,
                        tooltip: am5.Tooltip.new(
                            root,
                            config.xAxes?.[0]?.tooltip || {},
                        ),
                        ...(config.xAxes?.[0]?.title && {
                            title: am5.Label.new(root, config.xAxes[0].title),
                        }),
                    }),
                );
                xAxis.data.setAll(chartData);
            } else if (chartType === "scatter") {
                xAxis = chart.xAxes.push(
                    am5xy.ValueAxis.new(root, {
                        renderer: xRenderer,
                        tooltip: am5.Tooltip.new(
                            root,
                            config.xAxes?.[0]?.tooltip || {},
                        ),
                    }),
                );
            } else {
                throw new Error(`Unsupported chartType: ${chartType}`);
            }

            // Create Y axis
            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {
                        pan: config.yAxes?.[0]?.renderer?.pan || "zoom",
                    }),
                    maxDeviation: config.yAxes?.[0]?.maxDeviation || 1,
                    ...(config.yAxes?.[0]?.title && {
                        title: am5.Label.new(root, config.yAxes[0].title),
                    }),
                }),
            );

            // Create series
            if (
                chartType === "stackedbar" &&
                config.series &&
                Array.isArray(config.series)
            ) {
                config.series.forEach((seriesConfig) => {
                    const fillColor = createColor(seriesConfig.fill);
                    const series = chart.series.push(
                        am5xy.ColumnSeries.new(root, {
                            name: seriesConfig.name || "Series",
                            xAxis,
                            yAxis,
                            valueYField: valueField,
                            categoryXField: categoryField,
                            stacked: true,
                            ...(fillColor && { fill: fillColor }),
                            tooltip: am5.Tooltip.new(root, {
                                labelText:
                                    seriesConfig.tooltip?.labelText ||
                                    "{categoryX}: {valueY}",
                            }),
                        }),
                    );
                    series.data.setAll(chartData);
                    series.appear(config.appear?.duration || 1000);
                });
            } else {
                const seriesConfig = config.series?.[0] || {};
                const fillColor = createColor(seriesConfig.fill);

                let series: am5xy.XYSeries;

                switch (chartType) {
                    case "bar":
                        series = chart.series.push(
                            am5xy.ColumnSeries.new(root, {
                                name: seriesConfig.name || "Series",
                                xAxis,
                                yAxis,
                                valueYField: valueField,
                                categoryXField: categoryField,
                                ...(fillColor && { fill: fillColor }),
                                tooltip: am5.Tooltip.new(root, {
                                    labelText:
                                        seriesConfig.tooltip?.labelText ||
                                        "{categoryX}: {valueY}",
                                }),
                            }),
                        );
                        break;

                    case "line":
                        series = chart.series.push(
                            am5xy.SmoothedXLineSeries.new(root, {
                                name: seriesConfig.name || "Series",
                                xAxis,
                                yAxis,
                                valueYField: valueField,
                                categoryXField: categoryField,
                                sequencedInterpolation:
                                    seriesConfig.sequencedInterpolation ?? true,
                                ...(fillColor && { stroke: fillColor }),
                                tooltip: am5.Tooltip.new(root, {
                                    labelText:
                                        seriesConfig.tooltip?.labelText ||
                                        "{categoryX}: {valueY}",
                                }),
                            }),
                        );
                        if (seriesConfig.strokes) {
                            (
                                series as am5xy.SmoothedXLineSeries
                            ).strokes.template.setAll(seriesConfig.strokes);
                        }
                        if (
                            Array.isArray(seriesConfig.bullets) &&
                            seriesConfig.bullets.length
                        ) {
                            const bulletCfg = seriesConfig.bullets[0]; // hoặc loop qua mảng
                            series.bullets.push(() => {
                                return am5.Bullet.new(root, {
                                    locationY: bulletCfg.locationY ?? 0.5,
                                    sprite: am5.Circle.new(root, {
                                        radius: bulletCfg.sprite?.radius ?? 5,
                                        fill:
                                            bulletCfg.sprite?.fill ??
                                            am5.color(0xff0000),
                                        stroke:
                                            bulletCfg.sprite?.stroke ??
                                            am5.color(0xffffff),
                                        strokeWidth:
                                            bulletCfg.sprite?.strokeWidth ?? 2,
                                    }),
                                });
                            });
                        }

                        break;

                    case "area":
                        series = chart.series.push(
                            am5xy.LineSeries.new(root, {
                                name: seriesConfig.name || "Series",
                                xAxis,
                                yAxis,
                                valueYField: valueField,
                                categoryXField: categoryField,
                                ...(fillColor && { fill: fillColor }),
                                tooltip: am5.Tooltip.new(root, {
                                    labelText:
                                        seriesConfig.tooltip?.labelText ||
                                        "{categoryX}: {valueY}",
                                }),
                            }),
                        );
                        (series as am5xy.LineSeries).fills.template.setAll({
                            visible: true,
                            fillOpacity: seriesConfig.fillOpacity || 0.5,
                        });
                        if (seriesConfig.strokes) {
                            (
                                series as am5xy.LineSeries
                            ).strokes.template.setAll(seriesConfig.strokes);
                        }
                        if (
                            Array.isArray(seriesConfig.bullets) &&
                            seriesConfig.bullets.length
                        ) {
                            const bulletCfg = seriesConfig.bullets[0]; // hoặc loop qua mảng
                            series.bullets.push(() => {
                                return am5.Bullet.new(root, {
                                    locationY: bulletCfg.locationY ?? 0.5,
                                    sprite: am5.Circle.new(root, {
                                        radius: bulletCfg.sprite?.radius ?? 5,
                                        fill:
                                            bulletCfg.sprite?.fill ??
                                            am5.color(0xff0000),
                                        stroke:
                                            bulletCfg.sprite?.stroke ??
                                            am5.color(0xffffff),
                                        strokeWidth:
                                            bulletCfg.sprite?.strokeWidth ?? 2,
                                    }),
                                });
                            });
                        }
                        break;

                    case "scatter":
                        series = chart.series.push(
                            am5xy.LineSeries.new(root, {
                                name: seriesConfig.name || "Series",
                                xAxis,
                                yAxis,
                                valueYField: valueField,
                                valueXField: categoryField,
                                ...(fillColor && { fill: fillColor }),
                                tooltip: am5.Tooltip.new(root, {
                                    labelText:
                                        seriesConfig.tooltip?.labelText ||
                                        "{valueX}: {valueY}",
                                }),
                            }),
                        );
                        break;

                    default:
                        throw new Error(`Unsupported chartType: ${chartType}`);
                }

                series.data.setAll(chartData);
                series.appear(config.appear?.duration || 1000);
            }

            // Add cursor if configured
            if (config.cursor) {
                const cursor = am5xy.XYCursor.new(root, {
                    behavior: config.cursor.behavior || "none",
                });

                // Nếu có config cho lineY
                if (
                    config.cursor.lineY &&
                    typeof config.cursor.lineY.visible === "boolean"
                ) {
                    cursor.lineY.set("visible", config.cursor.lineY.visible);
                }

                // Nếu có config cho lineX
                if (
                    config.cursor.lineX &&
                    typeof config.cursor.lineX.visible === "boolean"
                ) {
                    cursor.lineX.set("visible", config.cursor.lineX.visible);
                }
                chart.set("cursor", cursor);
            }

            // Add scrollbar if configured
            if (config.scrollbarX) {
                // chart.set("scrollbarX", am5.Scrollbar.new(root, config.scrollbarX));
            }

            // Add legend if configured
            if (config.legend) {
                chart.children.push(
                    am5.Legend.new(root, {
                        centerX: am5.p50,
                        x: am5.p50,
                    }),
                );
            }

            chart.appear(
                config.appear?.duration || 1000,
                config.appear?.delay || 100,
            );
            return chart;
        },
        [chartType, chartData, categoryField, valueField, createColor],
    );

    useEffect(() => {
        // Cleanup previous chart
        if (rootRef.current) {
            rootRef.current.dispose();
            rootRef.current = null;
            chartInstanceRef.current = null;
        }

        if (!chartRef.current) {
            onError?.(new Error("Chart container div is not available"));
            return;
        }

        if (!validateData(chartData, chartType)) {
            return;
        }

        try {
            // Create root
            const root = am5.Root.new(chartRef.current);
            root.setThemes([am5themes_Animated.new(root)]);
            rootRef.current = root;

            // Create chart based on type
            let chart:
                | am5xy.XYChart
                | am5percent.PieChart
                | am5radar.RadarChart;

            switch (chartType) {
                case "pie":
                    console.log("12");

                    chart = createPieChart(root, chartConfig);
                    break;
                case "radar":
                    chart = createRadarChart(root, chartConfig);
                    break;
                default:
                    console.log("Unsupported chart type");
                    chart = createXYChart(root, chartConfig);
                    break;
            }

            chartInstanceRef.current = chart;
            onChartReady?.(chart);
        } catch (error) {
            console.error(`Error rendering ${chartType} chart:`, error);
            onError?.(error as Error);
        }

        return () => {
            if (rootRef.current) {
                rootRef.current.dispose();
                rootRef.current = null;
                chartInstanceRef.current = null;
            }
        };
    }, [
        chartType,
        chartData,
        chartConfig,
        categoryField,
        valueField,
        seriesField,
        validateData,
        createPieChart,
        createRadarChart,
        createXYChart,
        onChartReady,
        onError,
    ]);

    return (
        <div
            ref={chartRef}
            style={{ width, height }}
            role="img"
            aria-label={`${chartType} chart`}
        />
    );
};

export default AmChartRenderer;
