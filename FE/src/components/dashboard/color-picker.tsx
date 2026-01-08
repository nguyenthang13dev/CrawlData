"use client"

import { defaultThemes, widgetColors } from "@/libs/colorTheme"
import { ColorTheme } from "@/types/Dashboard/dashboard"
import { BgColorsOutlined, CheckOutlined } from "@ant-design/icons"
import { Button, Input, Popover, Space, Typography } from "antd"
import { useState } from "react"

const { Text } = Typography

interface ColorPickerProps {
  currentTheme: ColorTheme
  onThemeChange: (theme: ColorTheme) => void
  currentColor?: string
  onColorChange?: (color: string) => void
  type?: "theme" | "widget"
}

export function ColorPicker({
  currentTheme,
  onThemeChange,
  currentColor,
  onColorChange,
  type = "theme",
}: ColorPickerProps) {
  const [customColor, setCustomColor] = useState("")

  if (type === "widget" && onColorChange) {
    const widgetContent = (
      <div style={{ width: 256 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Text strong style={{ fontSize: 12 }}>
              Chọn màu có sẵn
            </Text>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 8 }}>
              {widgetColors.map((color) => (
                <Button
                  key={color.value}
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: color.value,
                    border: currentColor === color.value ? "2px solid #1890ff" : "2px solid transparent",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => onColorChange(color.value)}
                  title={color.name}
                >
                  {currentColor === color.value && <CheckOutlined style={{ color: "white" }} />}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Text strong style={{ fontSize: 12 }}>
              Màu tùy chỉnh
            </Text>
            <Space style={{ marginTop: 8 }}>
              <Input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ width: 48, height: 32, padding: 0 }}
              />
              <Button size="small" onClick={() => customColor && onColorChange(customColor)} disabled={!customColor}>
                Áp dụng
              </Button>
            </Space>
          </div>

          <Button block onClick={() => onColorChange("")}>
            Đặt lại màu mặc định
          </Button>
        </Space>
      </div>
    )

    return (
      <Popover content={widgetContent} title="Chọn màu sắc" trigger="click">
        <Button size="small">
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 2,
              backgroundColor: currentColor || currentTheme.primary,
              marginRight: 8,
              display: "inline-block",
            }}
          />
          Màu sắc
        </Button>
      </Popover>
    )
  }

  const themeContent = (
    <div style={{ width: 320 }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Text strong style={{ fontSize: 12 }}>
            Chọn chủ đề có sẵn
          </Text>
          <Space direction="vertical" style={{ width: "100%", marginTop: 8 }}>
            {defaultThemes.map((theme) => (
              <Button
                key={theme.id}
                style={{
                  width: "100%",
                  height: "auto",
                  padding: 12,
                  border: currentTheme.id === theme.id ? "2px solid #1890ff" : "2px solid #d9d9d9",
                  backgroundColor: currentTheme.id === theme.id ? "#f6ffed" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                onClick={() => onThemeChange(theme)}
              >
                <Space>
                  <Space size={4}>
                    <div style={{ width: 16, height: 16, borderRadius: 2, backgroundColor: theme.primary }} />
                    <div style={{ width: 16, height: 16, borderRadius: 2, backgroundColor: theme.accent }} />
                    <div style={{ width: 16, height: 16, borderRadius: 2, backgroundColor: theme.muted }} />
                  </Space>
                  <Text strong style={{ fontSize: 12 }}>
                    {theme.name}
                  </Text>
                  {currentTheme.id === theme.id && <CheckOutlined style={{ color: "#1890ff", marginLeft: "auto" }} />}
                </Space>
              </Button>
            ))}
          </Space>
        </div>
      </Space>
    </div>
  )

  return (
    <Popover content={themeContent} title="Chọn chủ đề màu" trigger="click">
      <Button size="small" icon={<BgColorsOutlined />}>
        Chủ đề màu
      </Button>
    </Popover>
  )
}
