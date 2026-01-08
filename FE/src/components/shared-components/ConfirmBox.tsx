import { Modal } from "antd";
import React from "react";

interface ConfirmBoxProps {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  isOpen,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn thực hiện thao tác này?",
  okText = "Đồng ý",
  cancelText = "Hủy",
  onOk,
  onCancel,
  loading = false,
}) => {
  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      centered
      destroyOnClose
    >
      {content}
    </Modal>
  );
};

export default ConfirmBox;
