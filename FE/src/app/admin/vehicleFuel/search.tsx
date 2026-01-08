
import SelectComponet from "@/components/shared-components/SelectCompoent";
import ParameterCode from "@/constants/ParameterCode";
import { VehicleFuelSearch } from "@/types/vehicleFuel/vehicleFuel";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, FormProps, Row } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN';
import React from "react";

interface Props {
    onFinish: FormProps<VehicleFuelSearch>["onFinish"];
}

const Search: React.FC<Props> = (props) => {
    const [form] = Form.useForm();

    return (
          <Card className="mb-2">
            <Form form={form} onFinish={props.onFinish} layout="vertical">
                {/* Hidden fields for month and year */}
                <Form.Item name="month" hidden>
                    <input type="hidden" />
                </Form.Item>
                <Form.Item name="year" hidden>
                    <input type="hidden" />
                </Form.Item>
                
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item<VehicleFuelSearch>
                            label="Xe"
                            name="plateNumber"
                        >
                            <SelectComponet code={ParameterCode.BIENSOXE} placeholder="Chọn xe" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item name="actionDate" label="Ngày">
                            <DatePicker placeholder="Nhập ngày" format="YYYY-MM-DD"
                                locale={locale}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item label="Tháng">
                            <DatePicker 
                                picker="month" 
                                placeholder="Chọn tháng" 
                                format="MM/YYYY" 
                                locale={locale} 
                                style={{ width: '100%' }}
                                onChange={(date) => {
                                    if (date) {
                                        form.setFieldsValue({ month: date.month() + 1 });
                                        form.setFieldsValue({ year: date.year() });
                                    } else {
                                        form.setFieldsValue({ month: undefined });
                                        form.setFieldsValue({ year: undefined });
                                    }
                                }}
                            />
                        </Form.Item>
                    </Col>
                   
                    <Col
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default Search;
