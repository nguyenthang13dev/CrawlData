"use client"

import { Table } from "antd";
import { PropsData } from "./types/Table";


interface PropColumns
{
    data: PropsData[];
    categoryField: string;
    valueField: string;
}

const TableDataRender: React.FC<PropColumns> = ({ data, categoryField, valueField }) => {
    const columns = [
        {
            title: categoryField,
            dataIndex: "title",
        },
        {
            title: valueField,
            dataIndex: "value",
        }
    ]

    console.log(data);
    

  return <Table dataSource={data} columns={columns} rowKey="title" />;
};

export default TableDataRender;
