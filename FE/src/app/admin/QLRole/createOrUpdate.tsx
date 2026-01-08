import { roleService } from "@/services/role/role.service";
import { DropdownOption } from "@/types/general";
import { createEditType, tableRoleType } from "@/types/role/role";
import { groupRules } from "@/validators/validationFormRules";
import
  {
    Button,
    Form,
    FormProps,
    Input,
    message,
    Modal
  } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  role?: tableRoleType | null;
  onClose: () => void;
  onSuccess: () => void;
  dropdownDepartment: DropdownOption[];
  isAdmin: boolean;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.role) {
        const response = await roleService.Update(formData);
        if (response.status) {
          message.success("Chỉnh sửa nhóm quyền thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          message.error(response.message);
        }
      } else {
        const response = await roleService.Create(formData);
        if (response.status) {
          message.success("Tạo nhóm quyền thành công");
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
    form.setFieldsValue(props.role);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.role) {
      handleMapEdit();
    }
  }, [handleMapEdit, props.isOpen, props.role]);

  return (
    <Modal
      title={
        props.role != null ? "Chỉnh sửa nhóm quyền" : "Thêm mới nhóm quyền"
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
        {props.role && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
          label="Mã nhóm quyền"
          name="code"
          rules={groupRules.code}
        >
          <Input maxLength={255} />
        </Form.Item>
        <Form.Item<createEditType>
          label="Tên nhóm quyền"
          name="name"
          rules={groupRules.name}
        >
          <Input maxLength={255} />
        </Form.Item>
        <Button htmlType="submit" style={{ display: "none" }} />
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
