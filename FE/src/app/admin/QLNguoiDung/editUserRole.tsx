import { roleService } from "@/services/role/role.service";
import { userRoleService } from "@/services/userRole/userRole.service";
import { tableUserDataType } from "@/types/auth/User";
import { Department } from "@/types/department/department";
import { DropdownOption } from "@/types/general";
import { createEditType } from "@/types/userRole/userRole";
import { fetchDropdown } from "@/utils/fetchDropdown";
import
  {
    Form,
    FormProps,
    Input,
    message,
    Modal,
    Select,
    Typography
  } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
  dropVaiTros: DropdownOption[];
  setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  dropDepartments: DropdownOption[];
  setDropDepartments: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
}

const EditUserRole: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [setupRole, setSetupRole] = useState<DropdownOption[]>();

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.user) {
        formData.userId = props.user?.id ?? "";
        const response = await userRoleService.Create(formData);
        if (response.status) {
          message.success("Phân nhóm quyền thành công");
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

  const handleMapEdit = async () => {
    if (props.user && props.user.vaiTro) {
      form.setFieldsValue({
        roleCode: props.user.vaiTro,
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

  const processDepartments = (departments: Department[], prefix = "") => {
    const optDrop: DropdownOption[] = [];

    departments.forEach((dept) => {
      optDrop.push({ label: `${prefix}${dept.name}`, value: dept.id });

      if (dept.departmentChilds && dept.departmentChilds?.length > 0) {
        optDrop.push(
          ...processDepartments(dept.departmentChilds, prefix + " ── ")
        );
      }
    });

    return optDrop;
  };

  const handleGetUserRoleByUserId = async () => {
    try {
      const response = await userRoleService.SetupRole(props.user?.id ?? "");

      if (response.status) {
        const departmentOptions = processDepartments(
          response.data?.departments
        );

        setSetupRole(departmentOptions);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    handleSetDropdownVaiTro();
    if (props.user) {
      handleMapEdit();
      // handleGetUserRoleByUserId();
    }
  }, [props.user]);

  return (
    <Modal
      title={"Phân nhóm quyền"}
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
          <Form.Item<createEditType>
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

        {/* <Form.Item<createEditType>
          label="Phòng ban"
          name="deparmentId"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            placeholder="Chọn phòng ban"
            options={setupRole}
            fieldNames={{ label: "text", value: "value" }}
            onChange={(value) => handleChangRole(value)}
          />
        </Form.Item> */}
        <Form.Item<createEditType> label="Chọn nhóm quyền" name="roleCode">
          <Select
            mode="multiple"
            placeholder="Chọn nhóm quyền người dùng"
            options={props.dropVaiTros}
            fieldNames={{ label: "label", value: "value" }}
            value={props.user?.vaiTro}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditUserRole;
