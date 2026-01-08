import themConfigDefault from "@/configs/theme.config";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
  TEMPLATE,
} from "@/constants/ThemeConstant";
import { useSelector } from "@/store/hooks";
import utils from "@/utils";
import styled from "@emotion/styled";
import { Grid } from "antd";
import Link from "next/link";
import React from "react";

const LogoWrapper = styled.div(() => ({
  height: TEMPLATE.HEADER_HEIGHT,
  display: "flex",
  alignItems: "center",
  padding: "0 1rem",
  backgroundColor: "transparent",
  transition: "all .2s ease",
}));

const { useBreakpoint } = Grid;

interface LogoProps {
  mobileLogo?: boolean;
  logoType: "light" | "default";
}

// Component Logo
export const Logo: React.FC<LogoProps> = ({ mobileLogo, logoType }) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");

  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  const navType = useSelector((state) => state.customizer.navType);

  const getLogoWidthGutter = (): string | number => {
    const isNavTop = navType === NAV_TYPE_TOP;

    if (isMobile && !mobileLogo) {
      return 0;
    }
    if (isNavTop) {
      return "auto";
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  const theme = useSelector((state) => state.theme.theme);
  const backgroundTitle =
    theme?.branding?.backgroundTitle ??
    themConfigDefault.branding?.backgroundTitle;

  return (
    <LogoWrapper className={isMobile && !mobileLogo ? "d-none" : "logo"}>
      <Link href="/admin/dashboard" className="flex items-center shrink-0">
        {/* <div>
          <img
            src="/img/logoct.png"
            alt=""
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
            }}
          />
        </div> */}

        <div className="font-bold uppercase text-black leading-4.5 center text-lg text-left font-sans tracking-tight">
          {process.env.NEXT_PUBLIC_HEADER_TITLE_DB}
        </div>
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
