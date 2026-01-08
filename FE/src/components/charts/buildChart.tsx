// lib/buildChart.ts
import AmChartRenderer from './AmChartRenderer';
import { AmChartRendererProps } from './types/Amchart';
/**
 * Function to build and return a chart component based on data and type.
 * @param options - Configuration options for the chart, including type, data, and fields.
 * @returns JSX.Element - The rendered AmChartRenderer component.
 */
export function buildChart(options: AmChartRendererProps): JSX.Element {
  const {
    chartType,
    chartData,
    chartConfig = {}, // Default to empty object
    categoryField = 'category',
    valueField = 'value',
    dateField = 'date',
    height = '500px',
    width = '100%',
    sqlRaw = ""
  } = options;

  return (
    <AmChartRenderer
      chartType={chartType}
      chartData={chartData}
      chartConfig={chartConfig}
      categoryField={categoryField}
      valueField={valueField}
      dateField={dateField}
      height={height}
      sqlRaw={sqlRaw}
      width={width}
      />
  );
}