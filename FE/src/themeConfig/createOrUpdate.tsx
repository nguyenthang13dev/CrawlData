import { themeConfigService } from '@/services/themeConfig/themeConfigService';
import {
  ThemeConfigCreateOrUpdateType,
  ThemeConfigType,
} from '@/types/themeConfig/themeConfig';
import {
  Col,
  ColorPicker,
  Form,
  FormProps,
  Input,
  message,
  Modal,
  Row,
  Switch,
  Tabs,
} from 'antd';
import { TabsProps } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import ImageUpload from './components/ImageUpload';

interface Props {
  item?: ThemeConfigType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ThemeConfigCreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm<ThemeConfigCreateOrUpdateType>();
  const enableBackgroundTextBlendMode = Form.useWatch(
    'enableBackgroundTextBlendMode',
    form
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (props.item) {
      form.setFieldsValue({ ...props.item });
    } else {
      form.setFieldsValue({
        fontFamily: 'var(--font-inter), system-ui',
        colorPrimary: '#ce1127',
        colorPrimaryHover: '#7a0a17',
        // colorPrimary100: '#CE11271A',
        colorBorder: '#a5a5a5',
        colorTextPlaceholder: '#bfbfbf',
        colorText: '#333',
        borderRadius: '4',
        isActive: false,
        fixedBackgroundTextColor: '#455560',
        enableBackgroundTextBlendMode: false,
        logoTitle: 'Hệ thống quản lý \nđơn thư khiếu nại tố cáo',
        backgroundTitle:
          'Hệ thống quản lý \nĐơn thư khiếu nại, tố cáo \nTrong bộ quốc phòng',
      });
    }
  }, [form, props.item]);

  const handleOnFinish: FormProps<ThemeConfigCreateOrUpdateType>['onFinish'] =
    async (formData: ThemeConfigCreateOrUpdateType) => {
      setIsLoading(true);
      // Chuyển object sang FormData
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (typeof value === 'boolean') {
          data.append(key, value ? 'true' : 'false');
        } else if (value !== undefined && value !== null) {
          data.append(key, value.toString());
        }
      });

      let response;
      if (props.item) {
        response = await themeConfigService.update(data);
        if (response.status) {
          message.success('Chỉnh sửa thành công');
        } else {
          message.error(response.message);
        }
      } else {
        response = await themeConfigService.create(data);
        if (response.status) {
          message.success('Thêm mới thành công');
        } else {
          message.error(response.message);
        }
      }

      if (response.status) {
        form.resetFields();
        props.onSuccess();
        props.onClose();
      }
      setIsLoading(false);
    };

  const handleCancel = () => {
    form.resetFields();
    props.onClose();
  };

  React.useEffect(() => {
    if (props.item) {
      form.setFieldsValue({
        ...props.item,
      });
    }
  }, [form, props.item]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Chung',
      forceRender: true,
      children: (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Tên chủ đề"
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin này!' },
              ]}
            >
              <Input placeholder="Tên chủ đề" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Tiêu đề trang chủ"
              name="logoTitle"
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin này!' },
              ]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Nhập tiêu đề cho trang chủ"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Font chữ"
              name="fontFamily"
            >
              <Input placeholder="Font chữ" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Bo góc"
              name="borderRadius"
            >
              <Input
                placeholder="Bo góc"
                defaultValue={4}
                type="number"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu chủ đạo"
              name="colorPrimary"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#ce1127" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu hover"
              name="colorPrimaryHover"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#7a0a17" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu active"
              name="colorPrimaryActive"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#CE11271A" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu border"
              name="colorBorder"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#a5a5a5" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu chữ gợi ý input"
              name="colorTextPlaceholder"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#bfbfbf" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Màu chữ"
              name="colorText"
              getValueFromEvent={(color) => color?.toRgbString()}
            >
              <ColorPicker defaultValue="#333" showText allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Hoạt động"
              name="isActive"
            >
              <Switch
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Trang đăng nhập',
      forceRender: true,
      children: (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Tiêu đề trang đăng nhập"
              name="backgroundTitle"
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin này!' },
              ]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Nhập tiêu đề cho trang đăng nhập"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Background Image"
              name="backgroundImageFile"
            >
              <ImageUpload
                valueUrl={props.item?.backgroundImagePath}
                onChange={(file) => {
                  form.setFieldsValue({ backgroundImageFile: file });
                  if (!file) {
                    form.setFieldValue('removeBackgroundImage', true);
                  } else {
                    form.setFieldValue('removeBackgroundImage', false);
                  }
                }}
                maxSizeMB={20}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Background Logo"
              name="backgroundLogoFile"
            >
              <ImageUpload
                valueUrl={props.item?.backgroundLogoPath}
                onChange={(file) => {
                  form.setFieldsValue({ backgroundLogoFile: file });
                  if (!file) {
                    form.setFieldValue('removeBackgroundLogo', true);
                  } else {
                    form.setFieldValue('removeBackgroundLogo', false);
                  }
                }}
                maxSizeMB={20}
              />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Bật/tắt chế độ tự động đổi màu chữ"
              name="enableBackgroundTextBlendMode"
            >
              <Switch
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
                defaultChecked
              />
            </Form.Item>
          </Col>
          {!enableBackgroundTextBlendMode && (
            <Col span={8}>
              <Form.Item<ThemeConfigCreateOrUpdateType>
                label="Chọn màu chữ khi không dùng chế độ auto"
                name="fixedBackgroundTextColor"
                getValueFromEvent={(color) => color?.toRgbString()}
              >
                <ColorPicker defaultValue="#455560" showText allowClear />
              </Form.Item>
            </Col>
          )}
        </Row>
      ),
    },
    {
      key: '3',
      label: 'Đơn vị',
      forceRender: true,
      children: (
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Tên đơn vị"
              name="companyName"
            >
              <Input placeholder="Tên đơn vị" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Địa chỉ"
              name="address"
            >
              <Input placeholder="Địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Số điện thoại"
              name="phoneNumber"
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType> label="Số Fax" name="fax">
              <Input placeholder="Số Fax" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Email"
              name="email"
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Logo"
              name="logoFile"
            >
              <ImageUpload
                valueUrl={props.item?.logoPath}
                onChange={(file) => {
                  form.setFieldsValue({ logoFile: file });
                  if (!file) {
                    form.setFieldValue('removeLogo', true);
                  } else {
                    form.setFieldValue('removeLogo', false);
                  }
                }}
                maxSizeMB={5}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Favicon"
              name="faviconFile"
            >
              <ImageUpload
                valueUrl={props.item?.faviconPath}
                onChange={(file) => {
                  form.setFieldsValue({ faviconFile: file });
                  if (!file) {
                    form.setFieldValue('removeFavicon', true);
                  } else {
                    form.setFieldValue('removeFavicon', false);
                  }
                }}
                maxSizeMB={5}
                accept="image/png,image/x-icon"
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      key: '4',
      label: 'Sự kiện',
      forceRender: true,
      children: (
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Logo Frame"
              name="logoFrameFile"
              className="text-center"
            >
              <ImageUpload
                valueUrl={props.item?.logoFramePath}
                onChange={(file) => {
                  form.setFieldsValue({ logoFrameFile: file });
                  if (!file) {
                    form.setFieldValue('removeLogoFrame', true);
                  } else {
                    form.setFieldValue('removeLogoFrame', false);
                  }
                }}
                maxSizeMB={5}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item<ThemeConfigCreateOrUpdateType>
              label="Avatar Frame"
              name="avatarFrameFile"
            >
              <ImageUpload
                valueUrl={props.item?.avatarFramePath}
                onChange={(file) => {
                  form.setFieldsValue({ avatarFrameFile: file });
                  if (!file) {
                    form.setFieldValue('removeAvatarFrame', true);
                  } else {
                    form.setFieldValue('removeAvatarFrame', false);
                  }
                }}
                maxSizeMB={5}
              />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Modal
      title={props.item != null ? 'Chỉnh sửa ' : 'Thêm mới '}
      open={true}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={1000}
      style={{ top: 20 }}
      className="modal-full"
      bodyStyle={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}
      confirmLoading={isLoading}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          destroyInactiveTabPane={false}
        />
        {props.item && (
          <Form.Item<ThemeConfigCreateOrUpdateType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        <Form.Item name="logoPath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="avatarFramePath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="logoFramePath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="backgroundImagePath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="backgroundLogoPath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="faviconPath" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="removeLogo" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="removeAvatarFrame" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="removeLogoFrame" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="removeBackgroundImage" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="removeBackgroundLogo" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="removeFavicon" hidden>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ThemeConfigCreateOrUpdate;
