import React, { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export interface ArcTransferBarChartProps {
  data: { category: string; value: number }[];
  chartId?: string;
  style?: React.CSSProperties;
}

const BarChart: React.FC<ArcTransferBarChartProps> = ({
  data,
  chartId = "chartdiv",
  style = { width: "100%", height: 500 },
}) => {
  const chartRef = useRef<am5.Root | null>(null);

  useLayoutEffect(() => {
    if (chartRef.current) {
      chartRef.current.dispose();
    }
    if (!data || data.length === 0) return;

      const root = am5.Root.new(chartId);
    chartRef.current = root;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });
    xRenderer.grid.template.setAll({ location: 1 });

      const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

      const yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });
      const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );

      const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Số lượng",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    if (root._logo) {
      root._logo.set("forceHidden", true); // Safely hide the logo
    }

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    series.columns.template.adapters.add("fill", function (fill, target) {
      if (!chart || !series.columns) return fill;
      return chart.get("colors")?.getIndex(series.columns.indexOf(target)) ?? fill;
    });
    series.columns.template.adapters.add("stroke", function (stroke, target) {
      if (!chart || !series.columns) return stroke;
      return chart.get("colors")?.getIndex(series.columns.indexOf(target)) ?? stroke;
    });

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data, chartId]);

  return <div id={chartId} style={style} />;
};

export default BarChart;
