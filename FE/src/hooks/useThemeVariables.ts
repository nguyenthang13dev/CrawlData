import { useEffect } from 'react';
import { ThemeConfig } from 'antd';

// Set biến CSS
function setCssVariable(key: string, value: string) {
  document.documentElement.style.setProperty(key, value);
}

// Đồng bộ theme
export function useThemeVariables(theme: ThemeConfig) {
  useEffect(() => {
    if (!theme?.token) return;

    // Mapping
    const mapping: Record<string, string> = {
      '--color-primary': theme.token.colorPrimary ?? '#1677ff',
      '--color-primary-hover': theme.token.colorPrimaryHover ?? '#4096ff',
      '--color-primary-active': theme.token.colorPrimaryActive ?? '#0958d9',
      '--color-bg-base': theme.token.colorBgBase ?? '#ffffff',
      '--color-text-base': theme.token.colorTextBase ?? '#000000',
    };

    Object.entries(mapping).forEach(([key, value]) => {
      if (value) setCssVariable(key, value);
    });
  }, [theme]);
}
