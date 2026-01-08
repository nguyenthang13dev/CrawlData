"use client";
import Loading from "@/components/shared-components/Loading";
import { themConfigDefault } from "@/configs/theme.config";
import { lightTheme } from "@/constants/ThemeConstant";
import { useThemeVariables } from "@/hooks/useThemeVariables";
import { themeConfigService } from "@/services/themeConfig/themeConfigService";
import { useDispatch, useSelector } from "@/store/hooks";
import { Providers } from "@/store/providers";
import { AppDispatch, RootState } from "@/store/store";
import { setTheme } from "@/store/theme/themeSlice";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import React, { useEffect, useState } from "react";
import "./global.css"
import "./layout.css"
function AppContent({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  useThemeVariables(theme || themConfigDefault);

  useEffect(() => {
    const handleGetTheme = async () => {
      try {
        const response = await themeConfigService.getCurrentTheme();
        if (response) {
          dispatch(setTheme(response.data));
        }
      } catch (error) {
        dispatch(setTheme(themConfigDefault));
        console.log(error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    handleGetTheme();
  }, [dispatch]);

  if (!isThemeLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading content="content"></Loading>
      </div>
    );
  }

  return (
    <ConfigProvider theme={theme} locale={viVN}>
      {children}
    </ConfigProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>{process.env.NEXT_PUBLIC_HEADER_TITLE}</title>
        <link rel="icon" type="image/x-icon" href="/img/ficon.png" />
      </head>
      <body className="dir-ltr vh-100">
        <div className="App min-h-screen vh-100">
          <Providers>
            <AppContent>{children}</AppContent>
          </Providers>
        </div>
      </body>
    </html>
  );
}