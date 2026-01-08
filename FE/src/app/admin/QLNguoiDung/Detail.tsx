import { tableUserDataType } from "@/types/auth/User";
import
  {
    CalendarOutlined,
    MailOutlined,
    MobileOutlined,
    SendOutlined,
    UserOutlined,
    UserSwitchOutlined
  } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

interface UserViewProps {
  user?: tableUserDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetail: React.FC<UserViewProps> = ({ user, isOpen, onClose }) => {
  if (!user) return <></>;
  return (
    <>
      <Modal
        title="Thông tin người dùng"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={600}
      >
        <div>
          <p>
            <UserOutlined />{" "}
            <span className="ml-3 text-dark">
              Tên tài khoản: {user?.userName}
            </span>
          </p>
          <p>
            <UserOutlined />{" "}
            <span className="ml-3 text-dark">Tên người dùng: {user?.name}</span>
          </p>
          <p>
            <CalendarOutlined />
            <span className="ml-3 text-dark">
              {" "}
              Ngày sinh: {user?.ngaySinh || "Chưa có"}
            </span>
          </p>
          <p>
            <UserSwitchOutlined />
            <span className="ml-3 text-dark">
              {" "}
              Giới tính: {user?.gioiTinh_txt || "Nam"}
            </span>
          </p>
          <p>
            <SendOutlined />
            <span className="ml-3 text-dark">
              {" "}
              Địa chỉ: {user?.diaChi || "Chưa có"}
            </span>
          </p>
        </div>
        <div className="mt-5">
          <h6 className="text-muted text-uppercase mb-3">Liên hệ</h6>
          <p>
            <MobileOutlined />
            <span className="ml-3 text-dark">
              {" "}
              {user?.phoneNumber || "Chưa có"}
            </span>
          </p>
          <p>
            <MailOutlined />
            <span className="ml-3 text-dark">{user?.email || "Chưa có"}</span>
          </p>
        </div>
       
      </Modal>
    </>
  );
};

export default UserDetail;
