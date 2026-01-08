export interface EntityType {
  id: string;
}

export interface ApiResponse<T = any> {
  data: T;
  status?: boolean;
  message?: string;
  errors?: string[] | null;
}

export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;
}

export interface DropdownTreeOptionAntd {
  loai: string;
  priority: undefined;
  value: string;
  title: string;
  label: string;
  children: DropdownTreeOptionAntd[];
}

export interface PagedList<T = any> {
  items: T[];
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
  totalPage?: number;
}

export interface DropdownGroup {
  nameConstant: string;
  lstDropdownOptions: DropdownOption[];
}

export interface ResponsePageInfo {
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number | 0;
  totalPage?: number | 0;
}

export interface SearchBase {
  pageIndex?: number | 1;
  pageSize?: number | 20;
}

export interface DataToSend {
  IdFile: string; // Id của file (giả sử là chuỗi)
  collection: ColumnConfig[]; // Cấu hình cột, là một mảng các đối tượng
}

export interface PieChartData {
  category: string;
  value: number;
}

// Interface for chart data organized by month
export interface ChartDataMonthlyDto {
  month: string;
  start: number;
  end: number;
  total: number;
}

// Interface for enhanced chart data with year-over-year comparison
export interface EnhancedChartDataDto {
  category: string;
  month: string;
  monthNumber: number;
  year: number;
  start: number;
  end: number;
  total: number;
  previousYearStart?: number;
  previousYearEnd?: number;
  previousYearTotal?: number;
  percentChangeStart?: number;
  percentChangeEnd?: number;
  percentChangeTotal?: number;
  currentPeriodLabel: string;
  previousPeriodLabel: string;
}

//#endregion
