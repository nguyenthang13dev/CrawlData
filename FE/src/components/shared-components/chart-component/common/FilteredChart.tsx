"use client";
import React, {ReactNode, useCallback, useState} from 'react';
import {Col, Row, Select, Space} from 'antd';
import ChartContainer from './ChartContainer';

const {Option} = Select;

interface FilteredChartProps<T, P extends Record<string, any>> {
    fetchFunction: (params: P) => Promise<T[]>;
    initialParams: P;
    renderChart: (data: T[]) => ReactNode;
    filters: {
        name: string;
        label: string;
        options: { label: string; value: any }[];
        defaultValue: any;
    }[];
    emptyMessage?: string;
    loadingMessage?: string;
    height?: number | string;
    onParamsChange?: (params: P) => void;
}

function FilteredChart<T, P extends Record<string, any>>({
                                                             fetchFunction,
                                                             initialParams,
                                                             renderChart,
                                                             filters,
                                                             emptyMessage = "Không có dữ liệu thống kê để hiển thị.",
                                                             loadingMessage = "Đang tải dữ liệu báo cáo...",
                                                             height = '400px',
                                                             onParamsChange
                                                         }: FilteredChartProps<T, P>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [params, setParams] = useState<P>(initialParams);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const responseData = await fetchFunction(params);
            setData(Array.isArray(responseData) ? responseData : []);
        } catch (error: any) {
            console.error("Error fetching chart data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, params]);

    React.useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const handleFilterChange = (name: string, value: any) => {
        const newParams = {...params, [name]: value};
        setParams(newParams);

        // Notify parent component about parameter changes
        if (onParamsChange) {
            onParamsChange(newParams);
        }
    };

    return (
        <>
            <Row justify="end" style={{marginBottom: 16}}>
                <Col>
                    <Space>
                        {filters.map(filter => (
                            <Select
                                key={filter.name}
                                defaultValue={filter.defaultValue}
                                style={{width: 120}}
                                onChange={(value) => handleFilterChange(filter.name, value)}
                            >
                                {filter.options.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        ))}
                    </Space>
                </Col>
            </Row>
            <ChartContainer
                loading={loading}
                hasData={data.length > 0}
                emptyMessage={emptyMessage}
                loadingMessage={loadingMessage}
                height={height}
            >
                {renderChart(data)}
            </ChartContainer>
        </>
    );
}

export default FilteredChart;
