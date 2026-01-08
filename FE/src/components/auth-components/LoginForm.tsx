import React, { useState } from "react";
import { Button, Form, Input, Alert, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store/store";
import { useSelector } from "@/store/hooks";
import { setShowMessage } from "@/store/general/GeneralSlice";
import { authService } from "@/services/auth/auth.service";
import { LoginType } from "@/types/auth/User";
import { setLogin } from "@/store/auth/AuthSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import systemLogsService from "@/services/systemLogs/systemLogsService";

interface LoginFormProps {
    onLoginStart?: () => void;
    onLoginEnd?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginStart, onLoginEnd }) => {
    const quickLogin = process.env.NEXT_PUBLIC_QUICK_LOGIN == "TRUE";

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const showMessage = useSelector((state) => state.general.showMessage);
    const [message, setMessage] = useState<string>("");

    const hideAuthMessage = () => {
        dispatch(setShowMessage(false));
    };

    const onLogin = async (loginForm: LoginType) => {
        if (onLoginStart) onLoginStart();
        setLoading(true);

        try {
            const data = await authService.login(loginForm);
            if (data != null && data.status) {
                dispatch(setLogin(data));
                systemLogsService.createLog("Đăng nhập");
                dispatch(setShowMessage(false));
                router.push("/admin/dashboard");
                // Don't call onLoginEnd here - let the loading continue until navigation completes
            } else {
                setMessage(
                    data.message || "Tài khoản hoặc mật khẩu không đúng",
                );
                dispatch(setShowMessage(true));
                if (onLoginEnd) onLoginEnd();
            }
        } catch (err) {
            setMessage("Tài khoản hoặc mật khẩu không đúng");
            if (onLoginEnd) onLoginEnd();
        } finally {
            setLoading(false);
        }
    };

    const normalLoginForm = (
        <Form<LoginType>
            layout="vertical"
            name="login-form"
            form={form}
            onFinish={onLogin}
            className="w-full space-y-6"
        >
            {/* Username */}
            <Form.Item
                name="username"
                label={
                    <span className="text-sm font-medium text-gray-700">
                        Tài khoản
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tài khoản đăng nhập",
                    },
                ]}
                className="mb-6"
            >
                <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Nhập tên đăng nhập"
                    size="large"
                    className="login-input h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </Form.Item>

            {/* Password */}
            {quickLogin ? (
                <Form.Item
                    name="password"
                    label={
                        <span className="text-sm font-medium text-gray-700">
                            Mật khẩu
                        </span>
                    }
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                    ]}
                    className="mb-6"
                    initialValue={"12345678"}
                >
                    <Input
                        prefix={<LockOutlined className="text-gray-400" />}
                        defaultValue={"12345678"}
                        size="large"
                        className="login-input h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </Form.Item>
            ) : (
                <Form.Item
                    name="password"
                    label={
                        <span className="text-sm font-medium text-gray-700">
                            Mật khẩu
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu",
                        },
                    ]}
                    className="mb-6"
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Nhập mật khẩu"
                        size="large"
                        className="login-input h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </Form.Item>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    className="mb-0"
                >
                    <Checkbox className="text-sm text-gray-600">
                        Ghi nhớ đăng nhập
                    </Checkbox>
                </Form.Item>
                <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Quên mật khẩu?
                </Link>
            </div>

            <Form.Item className="mb-0">
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    size="large"
                    className="login-button h-12 text-base font-medium rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <>
            {showMessage && (
                <Alert
                    type="error"
                    showIcon
                    message={message}
                    className="mb-6 text-sm rounded-lg border-red-200 bg-red-50"
                />
            )}

            {normalLoginForm}
        </>
    );
};

export default LoginForm;
