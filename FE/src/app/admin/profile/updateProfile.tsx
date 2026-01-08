import { userService } from "@/services/user/user.service";
import { createEditType, tableUserDataType } from "@/types/auth/User";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Radio,
  Row,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { message } from "antd";
import utc from "dayjs/plugin/utc";
import { groupRules, rules } from "@/validators/validationFormRules";
dayjs.extend(utc);
const UpdateProfile = ({
  item,
  onClose,
  onSuccess,
}: {
  item?: tableUserDataType | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm<createEditType>();
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    if (formData.ngaySinh) {
      formData.ngaySinh = formData.ngaySinh;
    }

    if (item && item.donViId) {
      formData.departmentId == item.donViId;
    }

    const response = await userService.Update(formData);
    if (response.status) {
      message.success("Cập nhật thông tin cá nhân thành công");
      form.resetFields();
      onSuccess();
    } else {
      message.error(response.message);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };
  useEffect(() => {
    if (item) {
      // const formattedNgaySinh = item.ngaySinh
      //   ? dayjs.utc(item.ngaySinh)
      //   : null;
      const gender_txt = item.gender?.toString();
      form.setFieldsValue({
        ...item,
        gender: gender_txt,
        ngaySinh: item.ngaySinh ? dayjs.utc(item.ngaySinh) : null,
      });
    }
  }, [form, item]);
  return (
    <Modal
      title="Chỉnh sửa thông tin cá nhân"
      open={true}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        onFinish={handleOnFinish}
        autoComplete="off"
        className="w-full"
      >
        <Form.Item<createEditType> name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          name="departmentId"
          initialValue={item?.donViId}
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType> name="donViId" hidden>
          <Input />
        </Form.Item>
        <Form.Item<createEditType>
          label="Họ tên"
          name="name"
          rules={groupRules.name}
        >
          <Input placeholder="Họ tên" />
        </Form.Item>
        <Form.Item<createEditType> label="Ngày sinh" name="ngaySinh">
          <DatePicker
            style={{ width: "100%" }}
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
          />
        </Form.Item>
        <Form.Item<createEditType>
          label="Email"
          name="email"
          rules={[rules.email, rules.onlySpaces]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item<createEditType>
          label="Điện thoại"
          name="phoneNumber"
          rules={[rules.phone]}
        >
          <Input placeholder="Điện thoại" />
        </Form.Item>
        <Form.Item<createEditType>
          label="Giới tính"
          name="gender"
          initialValue={1}
        >
          <Radio.Group>
            <Radio value={"1"}> Nam </Radio> {/* Chú ý: value là số */}
            <Radio value={"0"}> Nữ </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<createEditType>
          label="Địa chỉ"
          name="diaChi"
          rules={[rules.htmlJs, rules.onlySpaces]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>
      </Form>
      <Button htmlType="submit" hidden></Button>
    </Modal>
  );
};

export default UpdateProfile;
