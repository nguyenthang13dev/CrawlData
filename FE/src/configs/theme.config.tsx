import { themeBase } from "@/constants/ThemeConstant";
import { ThemeConfig } from "antd";

export interface CustomThemeConfig extends ThemeConfig {
  branding?: {
    logoPath?: string;
    avatarFramePath?: string;
    logoFramePath?: string;
    backgroundImagePath?: string;
    backgroundLogoPath?: string;
    faviconPath?: string;
    logoTitle?: string;
    backgroundTitle?: string;
    companyName?: string;
    address?: string;
    phoneNumber?: string;
    fax?: string;
    email?: string;
    enableBackgroundTextBlendMode?: boolean;
    fixedBackgroundTextColor?: string;
  };
}

export const themConfigDefault: CustomThemeConfig = {
  ...themeBase,
  token: {
    ...themeBase.token,
    colorPrimary: "#ce1127",
    colorPrimaryHover: "#7a0a17",
    colorPrimaryActive: "#CE11271A",
    fontFamily: `var(--font-inter), system-ui`,
  },
  components: {
    ...themeBase.components,
    Input: {
      ...themeBase.components?.Input,
      borderRadius: 4,
      colorBorder: "#a5a5a5",
      colorTextPlaceholder: "#bfbfbf",
      colorText: "#333",
    },
    Select: {
      ...themeBase.components?.Select,
      borderRadius: 4,
      colorBorder: "#a5a5a5",
      colorTextPlaceholder: "#bfbfbf",
    },
    DatePicker: {
      ...themeBase.components?.DatePicker,
      borderRadius: 4,
      colorBorder: "#a5a5a5",
      colorTextPlaceholder: "#bfbfbf",
    },
    Radio: {
      ...themeBase.components?.Radio,
      colorBorder: "#a5a5a5",
    },
    Form: {
      ...themeBase.components?.Form,
      colorText: "#222",
    },
    InputNumber: {
      ...themeBase.components?.InputNumber,
      borderRadius: 4,
      colorBorder: "#a5a5a5",
      colorTextPlaceholder: "#bfbfbf",
      colorText: "#333",
    },
  },
  branding: {
    logoPath: "/img/image1329quoc-huy-viet-nam.png",
    avatarFramePath: "",
    logoFramePath: "",
    backgroundImagePath: "/img/background.jpg",
    backgroundLogoPath: "/img/image1329quoc-huy-viet-nam.png",
    faviconPath: "/img/image1329quoc-huy-viet-nam.png",
    logoTitle: "",
    backgroundTitle: "",
    companyName: "",
    address: "Hà Nội",
    phoneNumber: "",
    fax: "",
    email: "",
    enableBackgroundTextBlendMode: false,
    fixedBackgroundTextColor: "#455560",
  },
};
export default themConfigDefault;
