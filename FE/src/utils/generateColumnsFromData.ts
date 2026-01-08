import { ColumnsType } from 'antd/es/table';



function flattenObject(obj: any, prefix = '', res: Record<string, any> = {}): Record<string, any> {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, path, res);
    } else {
      res[path] = value;
    }
  }
  return res;
}
function generateColumnsFromDataDeep<T extends object>(dataSource: T[]): ColumnsType<any> {
  if (!dataSource || dataSource.length === 0) return [];

  const flattened = flattenObject(dataSource[0]);

  const columns: ColumnsType<any> = Object.keys(flattened).map(key => ({
    title: key,
    dataIndex: key, // Note: dùng Table với flattened dataSource
    key,
    ellipsis: true,
  }));

  return columns;
}





export
{
    flattenObject, generateColumnsFromDataDeep
};

