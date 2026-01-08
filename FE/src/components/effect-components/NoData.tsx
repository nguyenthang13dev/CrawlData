import { Empty, Spin } from 'antd';
import { title } from 'process';
import React from 'react';

type NoDataProps = {
  className?: string;
  description?: string;
  style?: React.CSSProperties;
};

const NoData = ({ className = '', description, style }: NoDataProps) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center ${className}`}
      style={style}
    >
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
    </div>
  );
};

export default NoData;
