import vehicleService from "@/services/vehicle/vehicle.service";
import { VehicleType, VehicleTypeCreate } from "@/types/vehicle/vehicle";
import { Form, FormProps, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  vehicle?: VehicleType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<VehicleTypeCreate>["onFinish"] = async (
    formData: VehicleTypeCreate
  ) => {
    try {
      if (props.vehicle) {
        const response = await vehicleService.update(formData);
        if (response.status) {
          toast.success("Chỉnh sửa phương tiện thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await vehicleService.create(formData);
        if (response.status) {
          toast.success("Tạo phương tiện thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleMapEdit = () => {
    form.setFieldsValue(props.vehicle);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.vehicle) {
      handleMapEdit();
    } else {
      form.resetFields();
    }
  }, [props.isOpen, props.vehicle]);

  return (
    <Modal
      title={props.vehicle != null ? "Chỉnh sửa phương tiện" : "Thêm mới phương tiện"}
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
        {props.vehicle && (
          <Form.Item<VehicleTypeCreate> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item<VehicleTypeCreate>
          label="Tên phương tiện"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<VehicleTypeCreate>
          label="Biển số"
          name="plateNumber"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<VehicleTypeCreate>
          label="Tiêu thụ nhiên liệu (l/km)"
          name="consumerFuel"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<VehicleTypeCreate>
          label="Loại phương tiện"
          name="typeCategory"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;
