// theme/mapBackendTheme.ts
import themeDefault, { CustomThemeConfig } from "@/configs/theme.config";

export function mapBackendTheme(dto: any): CustomThemeConfig {
  return {
    token: {
      ...themeDefault.token,
      ...(dto.colorPrimary && { colorPrimary: dto.colorPrimary }),
      ...(dto.colorPrimaryHover && {
        colorPrimaryHover: dto.colorPrimaryHover,
      }),
      ...(dto.colorPrimaryActive && {
        colorPrimaryActive: dto.colorPrimaryActive,
      }),
      ...(dto.fontFamily && { fontFamily: dto.fontFamily }),
    },
    components: {
      ...themeDefault.components,
      Input: {
        ...themeDefault.components?.Input,
        ...(dto.borderRadius && { borderRadius: Number(dto.borderRadius) }),
        ...(dto.colorBorder && { colorBorder: dto.colorBorder }),
        ...(dto.colorTextPlaceholder && {
          colorTextPlaceholder: dto.colorTextPlaceholder,
        }),
        ...(dto.colorText && { colorText: dto.colorText }),
      },
      Select: {
        ...themeDefault.components?.Select,
        ...(dto.borderRadius && { borderRadius: Number(dto.borderRadius) }),
        ...(dto.colorBorder && { colorBorder: dto.colorBorder }),
        ...(dto.colorTextPlaceholder && {
          colorTextPlaceholder: dto.colorTextPlaceholder,
        }),
      },
      DatePicker: {
        ...themeDefault.components?.DatePicker,
        ...(dto.borderRadius && { borderRadius: Number(dto.borderRadius) }),
        ...(dto.colorBorder && { colorBorder: dto.colorBorder }),
        ...(dto.colorTextPlaceholder && {
          colorTextPlaceholder: dto.colorTextPlaceholder,
        }),
      },
      Radio: {
        ...themeDefault.components?.Radio,
        ...(dto.colorBorder && { colorBorder: dto.colorBorder }),
      },
      Form: {
        ...themeDefault.components?.Form,
        ...(dto.colorText && { colorText: dto.colorText }),
      },
      InputNumber: {
        ...themeDefault.components?.InputNumber,
        ...(dto.borderRadius && { borderRadius: Number(dto.borderRadius) }),
        ...(dto.colorBorder && { colorBorder: dto.colorBorder }),
        ...(dto.colorTextPlaceholder && {
          colorTextPlaceholder: dto.colorTextPlaceholder,
        }),
        ...(dto.colorText && { colorText: dto.colorText }),
      },
    },
    branding: {
      ...(dto.logoPath && { logoPath: dto.logoPath }),
      ...(dto.avatarFramePath && { avatarFramePath: dto.avatarFramePath }),
      ...(dto.logoFramePath && { logoFramePath: dto.logoFramePath }),
      ...(dto.backgroundImagePath && {
        backgroundImagePath: dto.backgroundImagePath,
      }),
      ...(dto.backgroundLogoPath && {
        backgroundLogoPath: dto.backgroundLogoPath,
      }),
      ...(dto.faviconPath && { faviconPath: dto.faviconPath }),
      ...(dto.logoTitle && { logoTitle: dto.logoTitle }),
      ...(dto.backgroundTitle && { backgroundTitle: dto.backgroundTitle }),
      ...(dto.companyName && { companyName: dto.companyName }),
      ...(dto.address && { address: dto.address }),
      ...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
      ...(dto.fax && { fax: dto.fax }),
      ...(dto.email && { email: dto.email }),
      ...(dto.enableBackgroundTextBlendMode && {
        enableBackgroundTextBlendMode: dto.enableBackgroundTextBlendMode,
      }),
      ...(dto.fixedBackgroundTextColor && {
        fixedBackgroundTextColor: dto.fixedBackgroundTextColor,
      }),
    },
  };
}
