import { Color, Percent } from "@amcharts/amcharts5";
import { PropsData } from "./Table";

export interface ChartConfig {
  panX?: boolean;
  panY?: boolean;
  wheelX?: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
  wheelY?: "zoomX" | "zoomY" | "zoomXY" | "panX" | "panY" | "panXY" | "none";
  pinchZoomX?: boolean;
  paddingLeft?: number;
  xAxes?: Array<{
    type: string;
    categoryField?: string;
    renderer?: {
      minGridDistance?: number;
      minorGridEnabled?: boolean;
      pan: any;
    };
    title?: { text: string };
    tooltip?: {
       labelText?: string;
      [key: string]: any; // nếu bạn muốn mở rộng
    };
  }>;
  yAxes?: Array<{
    type: string;
    renderer?: { pan?: any };
    maxDeviation?: number;
    title?: { text: string };
  }>;
  series?: Array<ChartSeriesConfig>;
  cursor?: {
    type?: string;
    behavior?: any;
    lineY?: any;
    lineX?: any;
  };
  scrollbarX?: { orientation: string };
  appear?: { duration: number; delay: number };
  radius?: number | Percent | undefined;
  innerRadius?: number | Percent | undefined;
  legend?: {
    centerX?: number | Percent | undefined;
    x?: Percent | number;
    centerY?: number | Percent | undefined;
    y?: Percent | number;
  };
}

export interface ChartSeriesConfig {
  name?: string;
  type?: string;
  valueYField?: string;
  categoryXField?: string;
  labels?: any;
  ticks?: any;
  valueXField?: string;
  sequencedInterpolation?: boolean;
  fill?: string;
  fillOpacity?: number;
  radius?: number | Percent;  
  innerRadius?: number | Percent;
  strokes?: { strokeWidth?: number };
  bullets?: Array<{
    locationY?: number;
    sprite?: {
      type?: string;
      radius?: number;
      stroke?: Color;
      strokeWidth?: number;
      fill?: Color;
    };
  }>;
  tooltip?: { labelText?: string };
}

export interface AmChartRendererProps {
  //Chart 
  dataTable?: PropsData[];
  chartType: string;
  chartData: any[];
  sqlRaw: string;

  chartConfig?: ChartConfig;
  categoryField?: string;
  valueField?: string;
  dateField?: string;
  seriesField?: string;
  height?: string;
  width?: string;
  onChartReady?: (chart: any) => void;
  onError?: (error: Error) => void;
}