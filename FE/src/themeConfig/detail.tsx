import React from 'react';
import { Drawer, Divider } from 'antd';
import { ThemeConfigType } from '@/types/themeConfig/themeConfig';
import * as extensions from '@/utils/extensions';

interface Props {
  item?: ThemeConfigType | null;
  onClose: () => void;
}

const ThemeConfigDetail: React.FC<Props> = ({ item, onClose }) => {
  return (
    <Drawer
      title={`Thông tin nhóm danh mục`}
      width="20%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={true}
    >
      <Divider dashed />
      <div>
        <p>
          <span className="ml-3 text-dark">Tên chủ đề: {item?.name}</span>
        </p>
        <p>
          <span className="ml-3 text-dark">
            Màu chủ đạo: {item?.colorPrimary}
          </span>
        </p>
        <p>
          <span className="ml-3 text-dark">
            Màu hover: {item?.colorPrimaryHover}
          </span>
        </p>
        <p>
          <span className="ml-3 text-dark">
            Màu active: {item?.colorPrimaryActive}
          </span>
        </p>
        <p>
          <span className="ml-3 text-dark">Font chữ: {item?.fontFamily}</span>
        </p>
        <p>
          <span className="ml-3 text-dark">Bo góc: {item?.borderRadius}</span>
        </p>
        <p>
          <span className="ml-3 text-dark">
            Màu border: {item?.colorBorder}
          </span>
        </p>
        <p>
          <span className="ml-3 text-dark">
            Màu viền: {item?.colorTextPlaceholder}
          </span>
        </p>
        <p>
          <span className="ml-3 text-dark">Màu chữ: {item?.colorText}</span>
        </p>
        <p>
          <span className="ml-3 text-dark">Hoạt động: {item?.isActive}</span>
        </p>
      </div>
    </Drawer>
  );
};

export default ThemeConfigDetail;
