"use client";
import { SwapLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { goBackOrRedirect } from "@/utils/navigation";

const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prev) => [...prev, window.location.pathname]);
  }, []);

  const handleBack = () => {
    goBackOrRedirect();
  };
  return (
    <Button
      icon={<SwapLeftOutlined />}
      size="small"
      variant="outlined"
      type="primary"
      className={`${className} ml-2`}
      onClick={handleBack}
    >
      Quay lại
    </Button>
  );
};

export default BackButton;
