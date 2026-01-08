import { roleService } from "@/services/role/role.service";
import { userService } from "@/services/user/user.service";
import { createEditType, tableUserDataType } from "@/types/auth/User";
import { DropdownOption, DropdownTreeOptionAntd } from "@/types/general";
import { fetchDropdown } from "@/utils/fetchDropdown";
import { groupRules, rules } from "@/validators/validationFormRules";
import
  {
    Col,
    DatePicker,
    Form,
    FormProps,
    Input,
    message,
    Modal,
    Radio,
    Row
  } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React, { useEffect, useState } from "react";
dayjs.extend(utc);
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
  dropVaiTros: DropdownOption[];
  departmentDropdown: DropdownTreeOptionAntd[];
  setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (formData.idTele == "") {
        formData.idTele = undefined;
      }
      if (props.user) {
        const response = await userService.Update(formData);
        if (response.status) {
          message.success("Chỉnh sửa tài khoản thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          message.error(response.message);
        }
      } else {
        const response = await userService.Create(formData);
        if (response.status) {
          message.success("Tạo tài khoản thành công");
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
    if (props.user) {
      form.setFieldsValue({
        ...props.user,
        donviIds: props.user.departmentIds,
        ngaySinh: props.user.ngaySinh ? dayjs.utc(props.user.ngaySinh) : null,
      });
    }
  };

  const handleSetDropdownVaiTro = async () => {
    await Promise.all([
      fetchDropdown(
        props.dropVaiTros,
        () => roleService.getDropDown(""),
        props.setDropVaiTros
      ),
    ]);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
    props.onClose();
  };

  useEffect(() => {
    // handleSetDropdownVaiTro();
    setIsOpen(props.isOpen);
    if (props.user) {
      handleMapEdit();
    } else {
      form.resetFields();
      form.setFieldValue("userName", "");
      form.setFieldValue("matKhau", "");
    }
  }, [props.isOpen]);

  return (
    <Modal
      maskClosable={false}
      title={props.user != null ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={1000}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.user && (
          <>
            <Form.Item<createEditType> name="id" hidden>
              <Input />
            </Form.Item>

            {/* <Form.Item<createEditType> name="userName" hidden>
              <Input />
            </Form.Item> */}

            <Form.Item<createEditType> name="matKhau" hidden>
              <Input />
            </Form.Item>
          </>
        )}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<createEditType>
              label="Tài khoản"
              name="userName"
              rules={groupRules.code}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<createEditType>
              label="Họ tên"
              name="name"
              rules={groupRules.name}
            >
              <Input maxLength={255} />
            </Form.Item>
          </Col>
        </Row>
        {!props.user && (
          <>
            <Form.Item<createEditType>
              label="Mật khẩu"
              name="matKhau"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
                {
                  min: 1,
                  message: "Mật khẩu phải có ít nhất 1 ký tự!",
                },
                rules.htmlJs,
                rules.onlySpaces,
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<createEditType>
              label="Email"
              name="email"
              rules={[rules.email]}
            >
              <Input />
            </Form.Item>
          </Col>
        
        </Row>
        {/* <Form.Item
          label="Vai trò"
          name="vaiTro"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn nhiều vai trò"
            options={props.dropVaiTros}
            fieldNames={{ label: "label", value: "value" }}
          />
        </Form.Item> */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<createEditType>
              label="Điện thoại"
              name="phoneNumber"
              rules={[rules.phone, rules.spaces]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item<createEditType> label="Ngày sinh" name="ngaySinh">
              <DatePicker
                style={{ width: "100%" }}
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item<createEditType>
          label="Giới tính"
          name="gender"
          initialValue="1"
        >
          <Radio.Group>
            <Radio value="1"> Nam </Radio>
            <Radio value="0"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<createEditType> label="Địa chỉ" name="diaChi">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
