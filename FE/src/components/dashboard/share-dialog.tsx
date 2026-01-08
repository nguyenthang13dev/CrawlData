"use client"

import { Widget } from "@/types/Dashboard/dashboard"
import
    {
        CheckOutlined,
        CopyOutlined,
        DownloadOutlined,
        EyeInvisibleOutlined,
        EyeOutlined,
        LinkOutlined,
    } from "@ant-design/icons"
import { Button, Card, Input, Modal, Space, Switch, Tabs, Typography, message } from "antd"
import { useState } from "react"

const { TextArea } = Input
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

interface ShareDialogProps {
  widgets: Widget[]
  isOpen: boolean
  onClose: () => void
}

export function ShareDialog({ widgets, isOpen, onClose }: ShareDialogProps) {
  const [isPublic, setIsPublic] = useState(true)
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [embedSettings, setEmbedSettings] = useState({
    width: "100%",
    height: "600",
    theme: "light",
    showHeader: true,
    allowInteraction: true,
  })

  const dashboardUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareUrl = `${dashboardUrl}${isPublic ? "?public=true" : "?private=true"}`

  const embedCode = `<iframe 
  src="${shareUrl}&embed=true&theme=${embedSettings.theme}&header=${embedSettings.showHeader}&interaction=${embedSettings.allowInteraction}" 
  width="${embedSettings.width}" 
  height="${embedSettings.height}px" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>`

  const reactEmbedCode = `import React from 'react';

const DashboardEmbed = () => {
  return (
    <iframe 
      src="${shareUrl}&embed=true&theme=${embedSettings.theme}"
      width="${embedSettings.width}" 
      height={${embedSettings.height}} 
      frameBorder="0"
      style={{
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: 'none'
      }}
    />
  );
};

export default DashboardEmbed;`

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates({ ...copiedStates, [key]: true })
      message.success("Đã sao chép vào clipboard!")
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [key]: false })
      }, 2000)
    } catch (error) {
      message.error("Sao chép thất bại, vui lòng thử lại.")
    }
  }

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`
    return qrUrl
  }

  const exportDashboard = (format: "json" | "csv") => {
    if (format === "json") {
      const dataStr = JSON.stringify({ widgets, settings: embedSettings, url: shareUrl }, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `dashboard-${Date.now()}.json`
      link.click()
      URL.revokeObjectURL(url)
    } else {
      const csvContent = [
        "Widget ID,Type,Title,Width,Height,X,Y",
        ...widgets.map((w) => `${w.id},${w.type},${w.title},${w.width},${w.height},${w.x},${w.y}`),
      ].join("\n")
      const dataBlob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `dashboard-widgets-${Date.now()}.csv`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Modal
      title={
        <Space>
          <LinkOutlined />
          Chia sẻ Dashboard
        </Space>
      }
      open={isOpen}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <Paragraph type="secondary">
        Chia sẻ dashboard của bạn với người khác hoặc nhúng vào website. Cấu hình quyền riêng tư và hiển thị bên dưới.
      </Paragraph>

      <Tabs defaultActiveKey="share">
        <TabPane tab="Chia sẻ Link" key="share">
          <Card title="Cài đặt Chia sẻ" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Text strong>Truy cập Công khai</Text>
                  <br />
                  <Text type="secondary">Cho phép bất kỳ ai có link xem dashboard này</Text>
                </div>
                <Space>
                  {isPublic ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  <Switch checked={isPublic} onChange={setIsPublic} />
                </Space>
              </div>

              <div>
                <Text strong>URL Chia sẻ</Text>
                <Space.Compact style={{ width: "100%", marginTop: 8 }}>
                  <Input value={shareUrl} readOnly style={{ fontFamily: "monospace" }} />
                  <Button
                    icon={copiedStates.shareUrl ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => copyToClipboard(shareUrl, "shareUrl")}
                  />
                </Space.Compact>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                <Card size="small" style={{ textAlign: "center" }}>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    {widgets.length}
                  </Title>
                  <Text type="secondary">Widgets</Text>
                </Card>
                <Card size="small" style={{ textAlign: "center" }}>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    {isPublic ? "Công khai" : "Riêng tư"}
                  </Title>
                  <Text type="secondary">Mức truy cập</Text>
                </Card>
              </div>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Mã Nhúng" key="embed">
          <Card title="Cài đặt Nhúng" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <Text strong>Chiều rộng</Text>
                  <Input
                    value={embedSettings.width}
                    onChange={(e) => setEmbedSettings({ ...embedSettings, width: e.target.value })}
                    placeholder="100% hoặc 800px"
                    style={{ marginTop: 4 }}
                  />
                </div>
                <div>
                  <Text strong>Chiều cao (px)</Text>
                  <Input
                    value={embedSettings.height}
                    onChange={(e) => setEmbedSettings({ ...embedSettings, height: e.target.value })}
                    placeholder="600"
                    style={{ marginTop: 4 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text strong>Hiển thị Header</Text>
                  <Switch
                    checked={embedSettings.showHeader}
                    onChange={(checked) => setEmbedSettings({ ...embedSettings, showHeader: checked })}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text strong>Cho phép Tương tác</Text>
                  <Switch
                    checked={embedSettings.allowInteraction}
                    onChange={(checked) => setEmbedSettings({ ...embedSettings, allowInteraction: checked })}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
                >
                  <Text strong>Mã HTML Nhúng</Text>
                  <Button
                    size="small"
                    icon={copiedStates.htmlEmbed ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => copyToClipboard(embedCode, "htmlEmbed")}
                  />
                </div>
                <TextArea value={embedCode} readOnly rows={6} style={{ fontFamily: "monospace" }} />
              </div>

              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}
                >
                  <Text strong>React Component</Text>
                  <Button
                    size="small"
                    icon={copiedStates.reactEmbed ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={() => copyToClipboard(reactEmbedCode, "reactEmbed")}
                  />
                </div>
                <TextArea value={reactEmbedCode} readOnly rows={8} style={{ fontFamily: "monospace" }} />
              </div>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Mã QR" key="qr">
          <Card title="Mã QR" style={{ marginBottom: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: 16,
                  backgroundColor: "white",
                  borderRadius: 8,
                  border: "1px solid #d9d9d9",
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                <img
                  src={generateQRCode() || "/placeholder.svg"}
                  alt="Dashboard QR Code"
                  style={{ width: 200, height: 200 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=200&text=QR+Code"
                  }}
                />
              </div>
              <div>
                <Paragraph type="secondary">Quét bằng điện thoại để mở dashboard</Paragraph>
                <Button
                  icon={<DownloadOutlined />}
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = generateQRCode()
                    link.download = "dashboard-qr-code.png"
                    link.click()
                  }}
                >
                  Tải xuống Mã QR
                </Button>
              </div>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Xuất dữ liệu" key="export">
          <Card title="Xuất Dashboard" style={{ marginBottom: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <Card size="small">
                <Title level={5}>Cấu hình JSON</Title>
                <Paragraph type="secondary">Cấu hình dashboard hoàn chỉnh bao gồm widgets và settings</Paragraph>
                <Button type="primary" icon={<DownloadOutlined />} onClick={() => exportDashboard("json")} block>
                  Xuất JSON
                </Button>
              </Card>

              <Card size="small">
                <Title level={5}>Danh sách Widget CSV</Title>
                <Paragraph type="secondary">Thông tin widget ở định dạng bảng tính</Paragraph>
                <Button icon={<DownloadOutlined />} onClick={() => exportDashboard("csv")} block>
                  Xuất CSV
                </Button>
              </Card>
            </div>

            <div style={{ paddingTop: 16, borderTop: "1px solid #f0f0f0" }}>
              <Title level={5}>Tóm tắt Dashboard</Title>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
                <div>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    {widgets.length}
                  </Title>
                  <Text type="secondary">Tổng Widgets</Text>
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    {new Set(widgets.map((w) => w.type)).size}
                  </Title>
                  <Text type="secondary">Loại Widget</Text>
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                    {Math.max(...widgets.map((w) => w.x + w.width), 24)}
                  </Title>
                  <Text type="secondary">Chiều rộng Grid</Text>
                </div>
              </div>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </Modal>
  )
}
