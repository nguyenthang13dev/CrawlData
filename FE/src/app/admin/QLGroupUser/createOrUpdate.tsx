import { Button, Form, FormProps, Input, Modal, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { message } from "antd";
import {
  tableGroupUserDataType,
  createEditType,
} from "@/types/groupUser/groupUser";
import { groupUserService } from "@/services/groupUser/groupUser.service";
import { groupRules } from "@/validators/validationFormRules";
import { DropdownOption, DropdownTreeOptionAntd } from "@/types/general";
import { removeAccents } from "@/libs/CommonFunction";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  GroupUser?: tableGroupUserDataType | null;
  onClose: () => void;
  onSuccess: () => void;
  isAdmin: boolean;
  dropdownDepartment: DropdownOption[];
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.GroupUser) {
        const response = await groupUserService.Update(formData);
        if (response.status) {
          message.success("Chỉnh sửa nhóm người thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          message.error(response.message);
        }
      } else {
        const response = await groupUserService.Create(formData);
        if (response.status) {
          message.success("Tạo nhóm người thành công");
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
    form.setFieldsValue(props.GroupUser);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.GroupUser) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.GroupUser != null
          ? "Chỉnh sửa nhóm người sử dụng"
          : "Thêm mới nhóm người sử dụng"
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
        {props.GroupUser && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<createEditType>
          label="Mã nhóm người sử dụng"
          name="code"
          rules={groupRules.code}
        >
          <Input maxLength={255} />
        </Form.Item>
        <Form.Item<createEditType>
          label="Tên nhóm người sử dụng"
          name="name"
          rules={groupRules.name}
        >
          <Input maxLength={255} />
        </Form.Item>
        {props.isAdmin && (
          <Form.Item<createEditType> label="Phòng ban" name="departmentId">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              styles={{
                popup: { root: { maxHeight: 400, overflow: "auto" } },
              }}
              placeholder="Chọn phòng ban"
              allowClear
              treeDefaultExpandAll
              treeData={props.dropdownDepartment}
              filterTreeNode={(input, treeNode) => {
                const title = treeNode.title as string;
                const inputText = removeAccents(input.toLowerCase());
                const nodeText = removeAccents(title.toLowerCase());
                return nodeText.includes(inputText);
              }}
            />
          </Form.Item>
        )}
        <Button htmlType="submit" style={{ display: "none" }} />
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
