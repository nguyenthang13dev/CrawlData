import { SearchBase } from "../general"

export interface Widget {
  id: string
  type: string
  title: string,
  sqlRaw?: string
  width: number // 1-24 columns
  height: number // grid rows
  x: number // position x (0-23)
  y: number // position y
  data?: any
  color?: string // Custom color for widget
  description?: string // Optional description
  dashboardItem?: string
  baoCaoItem?: string
}



export interface DashboardItemCreateVm {
  baoCaoItem: string
  width: number // 1-24 columns
  height: number // grid rows
  x: number // position x (0-23)
  y: number // position y
}


export interface ColorTheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
}



export interface DashboardCreateVm
{
  id: string,
  title: string,
  isDefault: boolean,
  description?: string // Optional description,
  widgets: Widget[],
  createdDate?: Date
}


export interface DashboardConfig {
  widgets: Widget[]
  theme: ColorTheme
  title: string
  description?: string
}
 export interface tableDashboardSearchDataType extends SearchBase { 
title?: string;
description?: string;
}
export type WidgetType = "chart" | "metric" | "table" | "text" | "image" | "calendar" | "weather" | "todo"
