import vehicleService from "@/services/vehicle/vehicle.service";
import vehicleFuelService from "@/services/vehicleFuel/vehicleFuel.service";
import { DropdownOption } from "@/types/general";
import { VehicleFuelCreate, VehicleFuelType } from "@/types/vehicleFuel/vehicleFuel";
import { DatePicker, Form, FormProps, Input, InputNumber, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

dayjs.locale("vi");

interface Props {
    isOpen: boolean;
    vehicleFuel?: VehicleFuelType | null;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [vehicles, setVehicles] = useState<DropdownOption[]>([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const res = await vehicleService.getDropVehicle();
            if (res.status && res.data) {
                setVehicles(res.data);
            }
        };
        fetchVehicles();
    }, []);

    const handleOnFinish: FormProps<VehicleFuelCreate>["onFinish"] = async (
        formData
    ) => {
        try {
            const payload: VehicleFuelCreate = {
                ...formData,
                actionDate: formData.actionDate ? dayjs(formData.actionDate).format("YYYY-MM-DD") : "",
            };

            if (props.vehicleFuel) {
                const response = await vehicleFuelService.update(payload);
                if (response.status) {
                    toast.success("Chỉnh sửa nhập nhiên liệu thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await vehicleFuelService.create(formData);
                if (response.status) {
                    toast.success("Tạo nhập nhiên liệu thành công");
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
        if (!props.vehicleFuel) return;

        form.setFieldsValue({
            ...props.vehicleFuel,
            actionDate: props.vehicleFuel.actionDate ? dayjs(props.vehicleFuel.actionDate) : null,
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.vehicleFuel) {
            handleMapEdit();
        } else {
            form.resetFields();
        }
    }, [props.isOpen, props.vehicleFuel]);

    return (
        <Modal
            title={props.vehicleFuel != null ? "Chỉnh sửa nhập nhiên liệu" : "Thêm mới nhập nhiên liệu"}
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
                {props.vehicleFuel && (
                    <Form.Item<VehicleFuelCreate> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}
                <Form.Item<VehicleFuelCreate>
                    label="Phương tiện"
                    name="idVehile"
                    rules={[{ required: true, message: "Vui lòng chọn phương tiện!" }]}

                >
                    <Select
                        showSearch
                        placeholder="Chọn phương tiện"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={(value: any, option?: DropdownOption | DropdownOption[]) => {
                            if (option && typeof option === 'object') {
                                form.setFieldsValue({ plateNumber: (option as DropdownOption).label });
                            }
                        }}
                        options={vehicles}

                    />
                </Form.Item>
                <Form.Item<VehicleFuelCreate>
                    name="plateNumber"
                    hidden
                >
                    <Input />
                </Form.Item>

                <Form.Item<VehicleFuelCreate>
                    label="Định mức (l)"
                    name="quanlity" // Keeping user's typo
                    rules={[{ required: true, message: "Vui lòng nhập định mức (lít)!" }]}
                >
                    <InputNumber style={{ width: "100%" }} addonAfter="L" />
                </Form.Item>


                <Form.Item<VehicleFuelCreate>
                    label="Loại"
                    name="type"
                    rules={[{ required: true, message: "Vui lòng nhập loại!" }]}
                >
                    <Input placeholder="Nhập loại" />
                </Form.Item>

                <Form.Item<VehicleFuelCreate>
                    label="Ngày thực hiện"
                    name="actionDate"
                    rules={[{ required: true, message: "Vui lòng chọn ngày thực hiện!" }]}
                >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                </Form.Item>

            </Form>
        </Modal>
    );
};
export default CreateOrUpdate;
