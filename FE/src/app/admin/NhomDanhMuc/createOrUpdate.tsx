import {
  createEditType,
  tableNhomDanhMucDataType,
} from "@/types/nhomDanhMuc/nhomDanhMuc";
import { Button, Form, FormProps, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { nhomDanhMucService } from "@/services/nhomDanhMuc/nhomDanhMuc.service";
import { message } from "antd";
import { groupRules, rules } from "@/validators/validationFormRules";

interface Props {
  isOpen: boolean;
  NhomDanhMuc?: tableNhomDanhMucDataType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.NhomDanhMuc) {
        const response = await nhomDanhMucService.Update(formData);
        if (response.status) {
          message.success("Chỉnh sửa nhóm danh mục thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          message.error(response.message);
        }
      } else {
        const response = await nhomDanhMucService.Create(formData);
        if (response.status) {
          message.success("Thêm mới nhóm danh mục thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleMapEdit = () => {
    form.setFieldsValue({
      id: props.NhomDanhMuc?.id,
      groupCode: props.NhomDanhMuc?.groupCode,
      groupName: props.NhomDanhMuc?.groupName,
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.NhomDanhMuc) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.NhomDanhMuc != null
          ? "Chỉnh sửa nhóm danh mục"
          : "Thêm mới nhóm danh mục"
      }
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.NhomDanhMuc && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {
          <>
            <Form.Item<createEditType>
              label="Mã nhóm danh mục"
              name="groupCode"
              rules={groupRules.code}
            >
              <Input maxLength={255} />
            </Form.Item>

            <Form.Item<createEditType>
              label="Tên nhóm danh mục"
              name="groupName"
              rules={groupRules.name}
            >
              <Input maxLength={255} />
            </Form.Item>
          </>
        }
        <Button htmlType="submit" hidden></Button>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
