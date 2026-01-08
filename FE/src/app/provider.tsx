'use client'

import { Providers } from "@/store/providers";
import { HeaderNav } from "@/components/layout-components/HeaderNav";
import { SideNav } from "@/components/layout-components/SideNav";
import { MEDIA_QUERIES, TEMPLATE } from "@/constants/ThemeConstant";
import { useSelector } from "@/store/hooks";
import utils from "@/utils";
import styled from "@emotion/styled";
import { ConfigProvider, Grid, Layout, Spin } from "antd";

import "@/app/assets/css/global.css";
// import '@/app/assets/css/font.css';
import "./layout.css";
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
import themConfig from "./theme.config";

dayjs.locale("vi");

const { useBreakpoint } = Grid;
const { Content } = Layout;

const AppContent = styled("div")<{ displayFull: boolean }>`
  padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER}px;
  margin-top: ${TEMPLATE.HEADER_HEIGHT}px;
  min-height: ${({ displayFull }) =>
    displayFull ? "calc(100vh - 70px)" : "calc(100vh - 126px)"};
  position: relative;
  @media ${MEDIA_QUERIES.MOBILE} {
    padding: ${TEMPLATE.LAYOUT_CONTENT_GUTTER_SM}px;
  }
  /* margin-bottom: 30px; */
`;

function LayoutContent({ children }: { children: React.ReactNode }) {
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

  useEffect(() => {
    NProgress.set(0.3);
    const timer = setInterval(() => {
      NProgress.inc(0.1);
    }, 300);

    return () => {
      clearInterval(timer);
      NProgress.set(1.0);
    };
  }, [pathname]);

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

   Spin.setDefaultIndicator(<LoadingOutlined spin />);

  return (
    <>
                {children}
      </>
  );
}
export default LayoutContent