import React, { useRef } from "react";
import { Input } from "antd";

interface InputColorProps {
  value?: string;
  onChange?: (color: string) => void;
  defaultColor?: string;
  style?: React.CSSProperties;
  label?: string;
  placeholder?: string;
}

const InputColor: React.FC<InputColorProps> = ({
  value,
  onChange,
  defaultColor = "#000000",
  style = {},
  label,
  placeholder = "#000000",
}) => {
  const color = value || defaultColor;
  const inputRef = useRef<any>(null);

  return (
    <div
      className={`flex items-center w-full ${style ? "" : ""}`}
      style={style}
    >
      {label && <span className="min-w-[70px] mr-2">{label}</span>}
      <div className="flex w-full">
        <input
          type="text"
          value={color}
          onChange={(e) => {
            let val = e.target.value;
            // Đảm bảo luôn là hex, tự thêm # nếu thiếu
            if (val && !val.startsWith("#"))
              val = "#" + val.replace(/[^0-9a-fA-F]/g, "");
            if (val.length > 7) val = val.slice(0, 7);
            onChange && onChange(val);
          }}
          placeholder={placeholder}
          maxLength={7}
          className="block w-full h-[38px] rounded-l border border-gray-300 border-r-0 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          style={{ minWidth: 80 }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="block w-[38px] h-[38px] rounded-r border border-gray-300 cursor-pointer bg-transparent"
          style={{ minWidth: 38, minHeight: 38, borderLeft: "none" }}
          tabIndex={-1}
          title="Chọn màu"
        />
      </div>
    </div>
  );
};

export default InputColor;
