import { setIsMobile } from "@/store/customizer/CustomizerSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { MenuDataType } from "@/types/menu/menu";
import utils from "@/utils";
import * as Icons from "@ant-design/icons";
import { Grid, Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
const { useBreakpoint } = Grid;

const setDefaultOpen = (key?: string): string[] => {
  if (!key) return [];
  const arr = key.split("-");
  const keyList: string[] = [];
  let keyString = "";
  arr.forEach((elm, index) => {
    keyString = index === 0 ? elm : `${keyString}-${elm}`;
    keyList.push(keyString);
  });
  return keyList;
};

type MenuItemProps = {
  title: string;
  icon?: ReactNode;
  path?: string;
  isSubMenu?: boolean;
};

const getAntdIconByName = (iconString: string) => {
  if (!iconString) return <Icons.SettingOutlined />;
  const match = iconString.match(/<(\w+)\s*\/>/);
  const iconName = match ? match[1] : null;
  if (!iconName) return <Icons.SettingOutlined />;
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent /> : <Icons.QuestionOutlined />;
};

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  icon,
  path,
  isSubMenu,
}) => {
  const dispatch = useDispatch();
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  // const navCollapsed = useSelector((state) => state.customizer.isCollapse);

  const closeMobileNav = () => {
    if (isMobile) {
      dispatch(setIsMobile(false));
    }
  };

  return (
    <>
      {/* {icon && icon} */}
      <span>
        {isSubMenu ? (
          <span style={{ fontWeight: "400" }}>{title}</span>
        ) : (
          <span style={{ fontWeight: "600" }}>{title}</span>
        )}
      </span>

      {path && <Link onClick={closeMobileNav} href={path} />}
    </>
  );
};

const getSideNavMenuItem = (
  navItem: MenuDataType[],
  isSubMenu: boolean = false,
  navCollapsed?: boolean
): MenuItemType[] => {
  return navItem
    .filter((x) => x.isAccess && x.isAccess == true && x.isShow == true)
    .map((nav: MenuDataType) => ({
      key: nav.id,
      icon: !isSubMenu ? (
        nav.classCss ? (
          getAntdIconByName(nav.classCss)
        ) : (
          <Icons.SettingOutlined />
        )
      ) : (
        // <MinusOutlined />
        <></>
      ),
      label: (
        <MenuItem
          title={nav.name || ""}
          {...(!nav.listMenu || nav.listMenu.length == 0
            ? { icon: nav.icon }
            : {})}
          {...(!nav.listMenu || nav.listMenu.length == 0
            ? { path: nav.url }
            : {})}
          isSubMenu={isSubMenu}
        />
      ),
      ...(nav.listMenu && nav.listMenu.length > 0
        ? {
            children: getSideNavMenuItem(nav.listMenu, true, navCollapsed),
          }
        : {}),
    }));
};

type SideNavContentProps = {
  routeInfo?: MenuDataType;
  hideGroupTitle?: boolean;
};

const SideNavContent: React.FC<SideNavContentProps> = ({
  routeInfo,
  hideGroupTitle,
}) => {
  const menuData: MenuDataType[] | null = useSelector(
    (state) => state.menu.menuData
  );
  const navCollapsed = useSelector((state) => state.customizer.isCollapse);
  const menuItems = useMemo(
    () => getSideNavMenuItem(menuData || [], false, navCollapsed),
    [menuData, navCollapsed]
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFullPath = useMemo(() => {
    const qs = searchParams?.toString();
    return qs && qs.length > 0 ? `${pathname}?${qs}` : pathname;
  }, [pathname, searchParams]);

  const urlMatchesWithQuery = useCallback(
    (configUrl: string, currentPath: string, currentFull: string): boolean => {
      // Nếu config có query, yêu cầu tất cả params có mặt và trùng giá trị
      try {
        const [cfgPath, cfgQuery] = configUrl.split("?");
        if (!cfgQuery) {
          // Không có query: so sánh path như cũ
          return (
            currentPath === cfgPath || currentPath.startsWith(cfgPath + "/")
          );
        }
        // Có query: path phải trùng và mọi param trong cfg phải có mặt trong current
        const current = new URLSearchParams(currentFull.split("?")[1] || "");
        const required = new URLSearchParams(cfgQuery);
        if (!(currentPath === cfgPath || currentPath.startsWith(cfgPath + "/")))
          return false;
        for (const [key, val] of required.entries()) {
          if (current.get(key) !== val) return false;
        }
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const findActiveId = useCallback(
    (
      items: MenuDataType[] | null | undefined,
      currentPath: string,
      currentFull: string
    ): string | undefined => {
      if (!items) return undefined;
      for (const item of items) {
        if (
          item.url &&
          urlMatchesWithQuery(item.url, currentPath, currentFull)
        ) {
          return item.id;
        }
        const child = findActiveId(item.listMenu, currentPath, currentFull);
        if (child) {
          return child;
        }
      }
      return undefined;
    },
    [urlMatchesWithQuery]
  );

  const activeId = useMemo(
    () => findActiveId(menuData, pathname, currentFullPath) || routeInfo?.id,
    // Note: findActiveId is defined in render; suppress exhaustive-deps by including it
    [findActiveId, menuData, pathname, currentFullPath, routeInfo?.id]
  );

  const [openKeys, setOpenKeys] = React.useState<string[]>(
    setDefaultOpen(activeId)
  );

  const findAncestorIdsByPath = useCallback(
    (
      items: MenuDataType[] | null | undefined,
      currentPath: string,
      trail: string[] = []
    ): string[] => {
      if (!items) return [];
      for (const item of items) {
        const newTrail = [...trail, item.id];
        if (
          item.url &&
          (currentPath === item.url || currentPath.startsWith(item.url + "/"))
        ) {
          // Trả về toàn bộ cha (không bao gồm leaf) để mở menu
          return trail;
        }
        const childTrail = findAncestorIdsByPath(
          item.listMenu,
          currentPath,
          newTrail
        );
        if (childTrail.length > 0) {
          return [...trail, item.id];
        }
      }
      return [];
    },
    []
  );

  // useEffect(() => {
  //     // Xác định các nhóm cần mở dựa trên route thay vì dựa vào cấu trúc id
  //     const ancestors = findAncestorIdsByPath(menuData, pathname);
  //     setOpenKeys(ancestors);
  // }, [findAncestorIdsByPath, pathname, menuData]);

  const onOpenChange = (keys: string[]) => {
    // Cho phép mở đồng thời nhiều nhóm thay vì chỉ nhóm mới nhất
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={[activeId || ""]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className={`left-menu ${hideGroupTitle ? "hide-group-title" : ""}`}
      items={menuItems}
      inlineCollapsed={navCollapsed}
    />
  );
};

const MenuContent: React.FC = () => {
  return <SideNavContent />;
};

export default MenuContent;
