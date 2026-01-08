import React, { createContext, useCallback, useContext, useState } from "react";
import ConfirmBox from "./ConfirmBox";

interface ConfirmOptions {
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface ConfirmContextType {
  showConfirm: (options: ConfirmOptions) => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
};

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const showConfirm = useCallback((opts: ConfirmOptions) => {
    setOptions({ ...opts });
    setVisible(true);
  }, []);

  const handleOk = () => {
    options.onOk?.();
    setVisible(false);
  };
  const handleCancel = () => {
    options.onCancel?.();
    setVisible(false);
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      <ConfirmBox
        isOpen={visible}
        title={options.title}
        content={options.content}
        okText={options.okText}
        cancelText={options.cancelText}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={options.loading}
      />
    </ConfirmContext.Provider>
  );
};
