"use client";
import React, {ReactNode} from 'react';
import {Col, Empty, Row, Spin} from 'antd';

interface ChartContainerProps {
    loading: boolean;
    hasData: boolean;
    emptyMessage?: string;
    loadingMessage?: string;
    height?: number | string;
    children: ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
                                                           loading,
                                                           hasData,
                                                           emptyMessage = "Không có dữ liệu thống kê để hiển thị.",
                                                           loadingMessage = "Đang tải dữ liệu báo cáo...",
                                                           height = '300px',
                                                           children
                                                       }) => {
    return (
        <Row justify="center">
            <Col span={24}>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: height
                    }}>
                        <Spin tip={loadingMessage} size="large"/>
                    </div>
                ) : hasData ? (
                    children
                ) : (
                    <Empty
                        description={emptyMessage}
                        style={{
                            height: height,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    />
                )}
            </Col>
        </Row>
    );
};

export default ChartContainer;
