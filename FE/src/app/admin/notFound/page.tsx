"use client";
import { Button, Row, Col, Image, ConfigProvider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import styled from "@emotion/styled";
import { lightTheme } from "@/constants/ThemeConstant";

const AuthContainer = styled.div(() => ({
  height: "100vh",
  background: "#f5f6fa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CenterBox = styled.div(() => ({
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  padding: "48px 32px",
  maxWidth: 900,
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 32,
}));

const TextBox = styled.div(() => ({
  flex: 1,
  minWidth: 260,
}));

const Error = () => {
  return (
    <AuthContainer>
      <ConfigProvider theme={lightTheme}>
        <CenterBox>
          <TextBox>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 36,
                marginBottom: 16,
                color: "#C8102E",
              }}
            >
              Trang không tồn tại
            </h1>
            <p
              style={{
                fontSize: 18,
                marginBottom: 32,
                color: "#555",
              }}
            >
              Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
              <br />
              Vui lòng kiểm tra lại địa chỉ hoặc quay về trang chính.
            </p>
            <Link href="/dashboard">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                size="large"
              >
                Quay lại trang chủ
              </Button>
            </Link>
          </TextBox>
          <div style={{ flex: 1, textAlign: "center" }}>
            <Image
              className="img-fluid"
              src="/img/others/img-20.png"
              alt="not found"
              preview={false}
              style={{ maxWidth: 350, width: "100%" }}
            />
          </div>
        </CenterBox>
      </ConfigProvider>
    </AuthContainer>
  );
};

export default Error;
