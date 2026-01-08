// lib/buildChart.ts
import TableDataRender from "./TableDataRender";
import { PropsData } from "./types/Table";



interface BuildTableProps {
  chartData: PropsData[];
  categoryField?: string;
  valueField?: string;
}

export function buildTable({
  chartData,
  categoryField = "category",
  valueField = "value",
}: BuildTableProps): JSX.Element {
  return (
    <TableDataRender
      data={chartData}
      categoryField={categoryField}
      valueField={valueField}
    />
  );
}
