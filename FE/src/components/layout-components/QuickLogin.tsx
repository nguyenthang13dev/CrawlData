import { authService } from '@/services/auth/auth.service';
import {
  DownOutlined,
  MehOutlined,
  RedditOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  message,
  Popover,
  Tooltip,
  Tree,
  TreeDataNode,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { setLogin } from '@/store/auth/AuthSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useSelector } from '@/store/hooks';
import { tableUserDataType } from '@/types/auth/User';
import { userService } from '@/services/user/user.service';
import { useRouter } from 'next/navigation';

export interface QuickLoginType {
  username?: string;
  password?: string;
}

const treeData: TreeDataNode[] = [
  {
    title: 'Cơ quan đơn vị trực thuộc thanh tra',
    key: '0-0',
    children: [
      {
        title: 'Cán bộ tiếp công dân',
        key: 'cbtiepcongdan_dvtttt',
      },
      {
        title: 'Cán bộ quản lý sổ đơn thư',
        key: 'cbqlsodonthu_dvtttt',
      },
      {
        title: 'Chánh thanh tra',
        key: 'ctt_coquandonvitructhuocthanhtra',
      },
      {
        title: 'Phó chánh thanh tra',
        key: 'pctt_coquandonvitructhuocthanhtra',
      },
      {
        title: 'Phó chánh thanh tra',
        key: 'pctt1_dvtttt',
      },
      {
        title: 'Thanh tra viên',
        key: 'ttv_coquandonvitructhuocthanhtra',
      },
    ],
  },
  {
    title: 'Quân khu 1',
    key: '0-1',
    children: [
      {
        title: 'Cán bộ tiếp công dân',
        key: 'cbtiepcongdan_qk1',
      },
      {
        title: 'Cán bộ quản lý sổ đơn thư',
        key: 'cbqlsodonthu_qk1',
      },
      {
        title: 'Chánh thanh tra',
        key: 'ctt_quankhu1',
      },
      {
        title: 'Phó chánh thanh tra',
        key: 'pctt_quankhu1',
      },
      {
        title: 'Thanh tra viên',
        key: 'ttv_quankhu1',
      },
    ],
  },
  {
    title: 'Quân khu 2',
    key: '0-2',
    children: [
      {
        title: 'Cán bộ tiếp công dân',
        key: 'cbtiepcongdan_qk2',
      },
      {
        title: 'Cán bộ quản lý sổ đơn thư',
        key: 'cbqlsodonthu_qk2',
      },
      {
        title: 'Chánh thanh tra',
        key: 'ctt_quankhu2',
      },
      {
        title: 'Phó chánh thanh tra',
        key: 'pctt_quankhu2',
      },
      {
        title: 'Thanh tra viên',
        key: 'ttv_quankhu2',
      },
    ],
  },
  {
    title: 'Thái Nguyên',
    key: '0-3',
    children: [
      {
        title: 'Cán bộ tiếp công dân',
        key: 'cbtiepcongdan_thainguyen',
      },
      {
        title: 'Cán bộ quản lý sổ đơn thư',
        key: 'cbqlsodonthu_thainguyen',
      },
      {
        title: 'Chánh thanh tra',
        key: 'ctt_thainguyen',
      },
      {
        title: 'Phó chánh thanh tra',
        key: 'pctt_thainguyen',
      },
      {
        title: 'Thanh tra viên',
        key: 'ttv_thainguyen',
      },
    ],
  },
  {
    title: 'Quản trị',
    key: '0-4',
    children: [
      {
        title: 'Admin',
        key: 'admin',
      },
    ],
  },
];

const QuickLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userInfo, getUserInfo] = useState<tableUserDataType>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState(userInfo?.userName);

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    if (isLoading) return;
    const selectedNode = info.node;
    if (selectedNode.children && selectedNode.children.length > 0) {
      return;
    }
    message.success(
      `Đăng nhập tài khoản: ${selectedNode.title} (username: ${selectedKeys[0]})`
    );
    onLogin({ username: String(selectedKeys[0]), password: '12345678' });
  };

  const loadData = async () => {
    const response = await userService.GetProfile();
    if (response.status) {
      getUserInfo(response.data);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success(`Đã sao chép: ${text}`);
      })
      .catch(() => {
        message.error('Sao chép thất bại');
      });
  };

  const markDisabledNodes = (
    data: TreeDataNode[],
    userName?: string
  ): TreeDataNode[] => {
    if (!userName) return data;

    let matchedParent: TreeDataNode | null = null;
    const rest: TreeDataNode[] = [];

    const updatedData = data.map((node) => {
      if (!node.children || node.children.length === 0) {
        rest.push(node);
        return node;
      }

      const updatedChildren = node.children.map((child) => ({
        ...child,
        disabled: child.key === userName,
      }));

      const hasMatchedChild = updatedChildren.some(
        (child) => child.key === userName
      );
      const newNode = {
        ...node,
        children: updatedChildren,
      };

      if (hasMatchedChild) {
        matchedParent = newNode;
      } else {
        rest.push(newNode);
      }

      return newNode;
    });

    return matchedParent ? [matchedParent, ...rest] : updatedData;
  };

  useEffect(() => {
    loadData();
  }, []);

  const onLogin = async (loginInfo: QuickLoginType) => {
    setIsLoading(true);
    try {
      const data = await authService.login(loginInfo);
      if (data != null && data.status) {
        dispatch(setLogin(data));
        copyToClipboard(loginInfo?.username ?? '');
        window.location.reload();
        // message.success(`Đăng nhập tài khoản ${loginInfo.username} thành công`);
      } else {
        message.error(data.message || 'Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (err) {
      message.error('Tài khoản hoặc mật khẩu không đúng');
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <Popover
      placement="leftBottom"
      title={
        <>
          <div className="uppercase text-center pb-2 border-b border-gray-200">
            Đăng nhập nhanh
          </div>
        </>
      }
      trigger="click"
      content={
        <Tree
          showIcon
          showLine
          defaultExpandAll
          defaultSelectedKeys={userInfo?.userName ? [userInfo?.userName] : []}
          switcherIcon={<DownOutlined />}
          treeData={markDisabledNodes(treeData, userInfo?.userName ?? '')}
          onSelect={handleSelect}
          style={{ maxHeight: '50vh' }}
          className="overflow-y-auto"
        />
      }
      className="!fixed z-50 right-4 bottom-4"
    >
      <Tooltip title="Đăng nhập nhanh">
        <Button
          type="primary"
          shape="circle"
          className="!rounded-full shadow-lg"
          icon={<RedditOutlined />}
          size="large"
        ></Button>
      </Tooltip>
    </Popover>
  );
};

export default QuickLogin;
