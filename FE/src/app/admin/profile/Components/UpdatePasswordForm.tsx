import React from 'react';
import { Form, Input, Button } from 'antd';

interface UpdatePasswordFormProps {
  onClose: () => void;
  onSubmit: (values: { Password: string; PasswordSoHoa: string; ConfirmPasswordSoHoa: string }) => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { Password: string; PasswordSoHoa: string; ConfirmPasswordSoHoa: string }) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ Password: '', PasswordSoHoa: '', ConfirmPasswordSoHoa: '' }}>
      <Form.Item
        label="Mật khẩu"
        name="Password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Mật khẩu số hóa"
        name="PasswordSoHoa"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu số hóa!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Xác nhận mật khẩu số hóa"
        name="ConfirmPasswordSoHoa"
        dependencies={['PasswordSoHoa']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu số hóa!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('PasswordSoHoa') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdatePasswordForm;
