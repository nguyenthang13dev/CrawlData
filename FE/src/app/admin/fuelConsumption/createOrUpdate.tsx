import SelectComponet from "@/components/shared-components/SelectCompoent";
import ParameterCode from "@/constants/ParameterCode";
import fuelConsumptionService from "@/services/fuelConsumption/fuelConsumption.service";
import { FuelConsumptionCreate, FuelConsumptionType } from "@/types/fuelConsumption/fuelConsumption";
import { DatePicker, Form, FormProps, Input, InputNumber, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

dayjs.locale("vi");
interface Props {
    isOpen: boolean;
    fuelConsumption?: FuelConsumptionType | null;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

    const handleOnFinish: FormProps<FuelConsumptionCreate>["onFinish"] = async (
        formData: FuelConsumptionCreate
    ) => {
        try {
            const payload = {
                ...formData,
                actionDate: dayjs(formData.actionDate).format("YYYY-MM-DD")
            };
            if (props.fuelConsumption) {
                const response = await fuelConsumptionService.update(payload);
                if (response.status) {
                    toast.success("Chỉnh sửa định mức thành công");
                    form.resetFields();
                    props.onSuccess();
                    props.onClose();
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await fuelConsumptionService.create(payload);
                if (response.status) {
                    toast.success("Tạo định mức thành công");
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
        if (props.fuelConsumption) {
            form.setFieldsValue({
                ...props.fuelConsumption,
                actionDate: props.fuelConsumption.actionDate ? dayjs(props.fuelConsumption.actionDate) : null
            });
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        props.onClose();
    };

    useEffect(() => {
        setIsOpen(props.isOpen);
        if (props.fuelConsumption) {
            handleMapEdit();
        } else {
            form.resetFields();
        }
    }, [props.isOpen, props.fuelConsumption]);



    return (
        <Modal
            title={props.fuelConsumption != null ? "Chỉnh sửa định mức" : "Thêm mới định mức"}
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={handleCancel}
            okText="Xác nhận"
            cancelText="Đóng"
            width={800}
        >
            <Form
                layout="vertical"
                form={form}
                name="formCreateUpdate"
                onFinish={handleOnFinish}
                autoComplete="off"
            >
                {props.fuelConsumption && (
                    <Form.Item<FuelConsumptionCreate> name="id" hidden>
                        <Input />
                    </Form.Item>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item<FuelConsumptionCreate>
                        label="Lịch trình"
                        name="scheduleName"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <Input placeholder="Nhập tên lịch trình" />
                    </Form.Item>

                    <Form.Item<FuelConsumptionCreate>
                        label="Công trình"
                        name="projectType"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <SelectComponet
                            code={ParameterCode.LOAICONGTRINH}
                            placeholder="Nhập loại công trình"
                        />
                    </Form.Item>

                    <Form.Item<FuelConsumptionCreate>
                        label="Biển số"
                        name="plateNumber"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <SelectComponet
                            code={ParameterCode.BIENSOXE}
                            placeholder="Nhập biển số xe"
                        />
                    </Form.Item>

                    <Form.Item<FuelConsumptionCreate>
                        label="Khối lượng (M3)"
                        name="volumeM3"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập khối lượng" />
                    </Form.Item>
                    <Form.Item<FuelConsumptionCreate>
                        label="Ngày thực hiện"
                        name="actionDate"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item<FuelConsumptionCreate>
                        label="Số chuyến"
                        name="tripCount"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} precision={0} placeholder="Nhập số chuyến" />
                    </Form.Item>

                    <Form.Item<FuelConsumptionCreate>
                        label="Số KM"
                        name="distanceKm"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập số km" />
                    </Form.Item>

                    {/* <Form.Item<FuelConsumptionCreate>
                        label="Nhiên liệu tiêu thụ (Lít)"
                        name="consumedFuel"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} placeholder="Nhập nhiên liệu tiêu thụ" />
                    </Form.Item> */}


                </div>
            </Form>
        </Modal>
    );
};
export default CreateOrUpdate;
