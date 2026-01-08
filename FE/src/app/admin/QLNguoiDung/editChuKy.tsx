import { tableUserDataType } from "@/types/auth/User";
import { Form, FormProps, Input, Modal, Typography, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import classes from "./page.module.css";
import { anhChuKySoType } from "@/types/auth/User";
import { userService } from "@/services/user/user.service";
import { StaticCustomBase } from "@/utils/BaseUrl";
import UploadFiler from "@/libs/UploadFilter";
import FileTypeConstant from "@/constants/FileTypeConstant";

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditChuKy: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [idAnhChuKySo, setIdAnhChuKySo] = useState<string[]>([]);

  const handleOnFinish: FormProps<anhChuKySoType>["onFinish"] = async (
    formData: anhChuKySoType
  ) => {
    try {
      if (props.user) {
        const userId = props.user?.id ?? "";
        formData.userId = userId;
        formData.taiLieuDinhKemId = idAnhChuKySo[0];
        const response = await userService.ganChuKy(formData);
        if (response.status) {
          message.success("Gán chữ ký thành công");
          form.resetFields();
          setFileList([]);
          setIdAnhChuKySo([]);
          props.onClose();
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleMapEdit = async () => {
    if (props.user && props.user.id) {
      const rs = await userService.getChuKy(props.user.id);
      if (rs.status) {
        const chuKySo: anhChuKySoType = rs.data;
        if (chuKySo) {
          setFileList([
            {
              uid: `${chuKySo.taiLieuDinhKemId}`,
              name: `${chuKySo.tenFile}`,
              status: "done",
              url: `${StaticCustomBase}/${chuKySo.duongDanFile}`,
            },
          ]);
          setIdAnhChuKySo([chuKySo.taiLieuDinhKemId ?? ""]);
        }
      } else {
        message.error(rs.message ?? "Đã có lỗi xảy ra");
      }
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    setFileList([]);
    setIdAnhChuKySo([]);
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    handleMapEdit();
  }, [props.isOpen]);

  return (
    <Modal
      title={"Gán chữ ký"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      // width={600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.user && (
          <Form.Item<anhChuKySoType>
            name="userId"
            initialValue={props.user?.id}
            hidden
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item>
          <Typography.Text className={classes.userNameText}>
            Người dùng: <strong>{props.user?.name}</strong>
          </Typography.Text>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item<anhChuKySoType>
            label="Hình ảnh chữ ký"
            name="taiLieuDinhKemId"
          >
            <UploadFiler
              listType="picture-card"
              maxFiles={1}
              fileList={fileList}
              setFileList={setFileList}
              type={FileTypeConstant.FileAnhChuKy}
              setUploadedData={setIdAnhChuKySo}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default EditChuKy;
