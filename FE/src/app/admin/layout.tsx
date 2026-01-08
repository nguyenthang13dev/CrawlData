"use client";
import { HeaderNav } from "@/components/layout-components/HeaderNav";
import { SideNav } from "@/components/layout-components/SideNav";
import { MEDIA_QUERIES, TEMPLATE } from "@/constants/ThemeConstant";
import { useSelector } from "@/store/hooks";
import utils from "@/utils";
import styled from "@emotion/styled";
import { ConfigProvider, Grid, Layout, Spin } from "antd";

// import '@/app/assets/css/font.css';
// import '@/app/assets/css/ant-button.css';

import Loading from "@/components/shared-components/Loading";
import { authService } from "@/services/auth/auth.service";
import { setUserInfo } from "@/store/auth/AuthSlice";
import { setMenuData } from "@/store/menu/MenuSlice";
import { AppDispatch } from "@/store/store";
import { UserType } from "@/types/auth/User";
import { MenuDataType } from "@/types/menu/menu";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
//chuyển khu vực của antd về việt nam
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import QuickLogin from "@/components/layout-components/QuickLogin";
import { toggleSidebar } from "@/store/customizer/CustomizerSlice";
import { LoadingOutlined } from "@ant-design/icons";
import NProgress from "nprogress"; // Thêm nprogress
import "nprogress/nprogress.css";

import themConfig from "../theme.config";
import "./layout.css"
import PageHeader from "@/components/layout-components/PageHeader";
dayjs.locale("vi");

const { useBreakpoint } = Grid;
const { Content } = Layout;

const AppContent = styled("div") <{}>`
  padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER}px;
  margin-top: ${TEMPLATE.HEADER_HEIGHT}px;
  min-height: calc(100vh - 126px);
  position: relative;
  @media ${MEDIA_QUERIES.MOBILE} {
    padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER_SM}px;
  }
  /* margin-bottom: 30px; */
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state) => state.general.isLoading);
  const pathname = usePathname();
  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = screens.length === 0 ? false : !screens.includes("lg");
  const userInfo: UserType | null = useSelector((state) => state.auth.User);
  const menuData: MenuDataType[] | null = useSelector(
    (state) => state.menu.menuData
  );
  const displayFull = pathname.startsWith("/dTHoSoXuLy/");

  const getLayoutGutter = () => {
    if (isMobile) {
      return 80;
    }
    return navCollapsed
      ? TEMPLATE.SIDE_NAV_COLLAPSED_WIDTH
      : TEMPLATE.SIDE_NAV_WIDTH;
  };

  const getLayoutDirectionGutter = () => {
    return { paddingLeft: getLayoutGutter() };
  };

  const handleGetUserInfo = async () => {
    try {
      const response = await authService.getInfo();

      if (response) {
        dispatch(setUserInfo(response));
        dispatch(setMenuData(response));
      }
    } catch (error) {
      console.log(error);
    }
  };



  // Tự động đóng sidebar khi chuyển sang chế độ mobile
  useEffect(() => {
    if (isMobile && !navCollapsed) {
      dispatch(toggleSidebar());
    }
  }, [isMobile, navCollapsed, dispatch]);

  useEffect(() => {
    if (userInfo == null || menuData == null) {
      handleGetUserInfo();
    }
  }, []);


  // useEffect(() => {
  //   NProgress.set(0.3);
  //   const timer = setInterval(() => {
  //     NProgress.inc(0.1);
  //   }, 300);

  //   return () => {
  //     clearInterval(timer);
  //     NProgress.set(1.0);
  //   };
  // }, [pathname]);

  // Spin.setDefaultIndicator(<LoadingOutlined spin />);

  return (
    <ConfigProvider locale={locale} theme={themConfig}>
      <Layout className="!min-h-screen">
        <HeaderNav></HeaderNav>
        <SideNav />
        <Layout style={getLayoutDirectionGutter()}>
          <AppContent>
            <PageHeader display={true} title={`${process.env.NEXT_PUBLIC_HEADER_TITLE_DB}`} />
            <Content className="h-100">
              <Suspense fallback={<Loading content="content" />}>
                {children}
              </Suspense>
            </Content>
          </AppContent>


          {loading && <Loading content="page" />}
          {pathname !== '/auth/login' && pathname !== '/auth/register' && (
            <div className="flex items-center gap-6 justify-center p-1">
              <div className="text-md font-semibold">
                {process.env.NEXT_PUBLIC_FOOTER_TITLE}
              </div>
              <div>
                <div className="p-1">
                  Địa chỉ: {process.env.NEXT_PUBLIC_ADDRESS}
                </div>
                <div className="flex gap-6 p-1">
                  <div>Điện thoại: {process.env.NEXT_PUBLIC_PHONE}</div>
                  <div>Website: {process.env.NEXT_PUBLIC_WEBSITE}</div>
                  <div>Email: {process.env.NEXT_PUBLIC_EMAIL}</div>
                </div>
              </div>
            </div>
          )}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
