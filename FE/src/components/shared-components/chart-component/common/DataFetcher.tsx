"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { message } from "antd";
import ChartContainer from "./ChartContainer";

interface DataFetcherProps<T> {
  fetchFunction: (params?: any) => Promise<T[]>;
  fetchParams?: any;
  renderChart: (data: T[]) => ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
  height?: number | string;
}

function DataFetcher<T>({
  fetchFunction,
  fetchParams = {},
  renderChart,
  emptyMessage,
  loadingMessage,
  height,
}: DataFetcherProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetchedData = useRef<boolean>(false); // Thêm ref để theo dõi việc đã tải dữ liệu hay chưa

  const fetchData = useCallback(async () => {
    // Kiểm tra nếu đã tải dữ liệu rồi thì không tải lại
    if (hasFetchedData.current) return;

    setLoading(true);
    try {
      const responseData = await fetchFunction(fetchParams);

      if (Array.isArray(responseData)) {
        setData(responseData);
      } else {
        console.error("Response is not an array:", responseData);
        setData([]);
      }
      // Đánh dấu đã tải dữ liệu thành công
      hasFetchedData.current = true;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Đã có lỗi xảy ra khi tải dữ liệu báo cáo.";
      message.error(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, fetchParams]);

  useEffect(() => {
    // Chỉ gọi fetchData nếu chưa tải dữ liệu
    if (!hasFetchedData.current) {
      void fetchData();
    }
  }, [fetchData]);

  // Nếu fetchParams thay đổi và cần tải lại dữ liệu
  useEffect(() => {
    // Reset flag để cho phép tải lại khi fetchParams thay đổi một cách có chủ đích
    // (không phải do re-render ngẫu nhiên)
    if (Object.keys(fetchParams).length > 0 && hasFetchedData.current) {
      hasFetchedData.current = false;
      void fetchData();
    }
  }, [fetchParams, fetchData]); // Thêm fetchData vào dependency array

  return (
    <ChartContainer
      loading={loading}
      hasData={data.length > 0}
      emptyMessage={emptyMessage}
      loadingMessage={loadingMessage}
      height={height}
    >
      {renderChart(data)}
    </ChartContainer>
  );
}

export default DataFetcher;
