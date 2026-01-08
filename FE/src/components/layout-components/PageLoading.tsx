import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

type PageLoadingProps = {
  loading?: boolean;
};

const PageLoading = ({ loading = true }: PageLoadingProps) => {
  return (
    loading && (
      <div
        className="fixed w-full h-full z-[9999] flex justify-center items-center flex-col"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <Spin indicator={<LoadingOutlined spin />} size="large" />
        <span className="mt-3 text-white">Đang xử lý</span>
      </div>
    )
  );
};

export default PageLoading;
