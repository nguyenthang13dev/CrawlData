import Flex from "@/components/shared-components/Flex";
import {
  FONT_SIZES,
  FONT_WEIGHT,
  MEDIA_QUERIES,
  SPACER,
} from "@/constants/ThemeConstant";
import systemLogsService from "@/services/systemLogs/systemLogsService";
import { setLogout } from "@/store/auth/AuthSlice";
import { useSelector } from "@/store/hooks";
import { resetMenuData } from "@/store/menu/MenuSlice";
import { AppDispatch } from "@/store/store";
import {
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import NavItem from "./NavItem";

// Styled components
const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;

const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
  opacity: 0.8,
}));

interface MenuItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MenuItemSignOutProps {
  label: string;
}

// const MenuItem: React.FC<MenuItemProps> = ({ label, icon }) => (
//   <Flex as="a" alignItems="center" gap={SPACER[2]}>
//     <Icon>{icon}</Icon>
//     <span>{label}</span>
//   </Flex>
// );
const MenuItem: React.FC<MenuItemProps> = ({ label, icon, path }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(path); // Điều hướng đến path
  };

  return (
    <Flex
      as="a"
      alignItems="center"
      gap={2}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Icon>{icon}</Icon>
      <span>{label}</span>
    </Flex>
  );
};

const MenuItemSignOut: React.FC<MenuItemSignOutProps> = ({ label }) => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleSignOut = async () => {
    dispatch(setLogout());
    dispatch(resetMenuData());
    route.push("/auth/login");
  };

  return (
    <div onClick={handleSignOut}>
      <Flex alignItems="center" gap={SPACER[2]}>
        <Icon>
          <LogoutOutlined />
        </Icon>
        <span>{label}</span>
      </Flex>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    key: "Profile",
    label: (
      <MenuItem
        path="/admin/profile"
        label="Thông tin cá nhân"
        icon={<UserOutlined />}
      />
    ),
  },
  {
    key: "Change Password",
    label: (
      <MenuItem
        path="/admin/changePassword"
        label="Đổi mật khẩu"
        icon={<KeyOutlined />}
      ></MenuItem>
    ),
  },
  {
    key: "Đăng xuất",
    label: <MenuItemSignOut label="Đăng xuất" />,
  },
];

export const NavProfile: React.FC = () => {
  const user = useSelector((state) => state.auth.User);
  console.log(user);

  const StaticFileUrl = process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL;
  return (
    <Dropdown
      placement="bottomRight"
      menu={{ items }}
      trigger={["click"]}
      className="shrink-0 p-0 pr-2"
    >
      <NavItem>
        <Profile>
          <Avatar
            src={
              user?.picture != "" ? `${StaticFileUrl}/${user?.picture}` : "/img/avatars/default-avatar.png"
            }
          />
          <UserInfo className="profile-text flex items-center">
            <Name className="!text-gray-600 truncate">
              {user?.name}
            </Name>
            <div>
              <DownOutlined className="!text-gray-600 !text-[10px]" />
            </div>
          </UserInfo>
        </Profile>
      </NavItem>
    </Dropdown>
  );
};

export default NavProfile;
