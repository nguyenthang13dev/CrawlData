import { VehicleType } from "@/types/vehicle/vehicle";
import
  {
    CloseOutlined
  } from "@ant-design/icons";
import { Divider, Drawer } from "antd";
import React from "react";


interface VehicleViewProps {
  vehicle?: VehicleType | null;
  isOpen: boolean;
  onClose: () => void;
}

const VehicleDetail: React.FC<VehicleViewProps> = ({ vehicle, isOpen, onClose }) => {
  return (
    <Drawer
      title={`Thông tin xe`}
      width="40%"
      placement="right"
      onClose={onClose}
      closable={true}
      open={isOpen}
      closeIcon={<CloseOutlined />}
    >
      <div className=" mt-3">
        <span>Tên xe</span>
        <h4 className="mt-2 mb-0">{vehicle?.name}</h4>
      </div>
      <Divider dashed />
      <div className="mt-3">
        <span>Biển số xe</span>
        <h4 className="mt-2 mb-0">{vehicle?.plateNumber}</h4>
      </div>
      <Divider dashed />
      <div className="mt-3">
        <span>Loại xe:</span>
        <h4 className="mt-2 mb-0">{vehicle?.typeCategory}</h4>
      </div>
      <Divider dashed />
      <div className="mt-3">
        <span>Định mức (l/km):</span>
        <h4 className="mt-2 mb-0">{vehicle?.consumerFuel}</h4>
      </div>
    </Drawer>
  );
};

export default VehicleDetail;
