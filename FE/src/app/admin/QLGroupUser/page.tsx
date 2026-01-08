"use client";
import Flex from "@/components/shared-components/Flex";
import { DropdownTreeOptionAntd, ResponsePageInfo } from "@/types/general";
import withAuthorization from "@/libs/authentication";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserAddOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./page.module.css";
import Search from "./search";
import CreateOrUpdate from "./createOrUpdate";
import { message } from "antd";
import {
  tableGroupUserDataType,
  searchGroupUserData,
} from "@/types/groupUser/groupUser";
import { groupUserService } from "@/services/groupUser/groupUser.service";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import EditUserGroupRole from "./editUserGroupRole";
import VaiTroConstant, { hasRole } from "@/constants/VaiTroConstant";
import { departmentService } from "@/services/department/department.service";

const QLGroupUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state) => state.auth.User);
  const isAdmin = hasRole(VaiTroConstant.Admin, user?.listRole ?? []);
  const [listModule, setListModule] = useState<tableGroupUserDataType[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<searchGroupUserData | null>(
    null
  );
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [currentGroupUser, setCurrentGroupUser] =
    useState<tableGroupUserDataType | null>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isEditGroupUserRole, setIsEditGroupUserRole] =
    useState<boolean>(false);
  const [departmentDropdown, setDepartmentDropdown] = useState<
    DropdownTreeOptionAntd[]
  >([]);

  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

  const tableColumns: TableProps<tableGroupUserDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: "1%",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Mã nhóm người sử dụng",
      dataIndex: "code",
      render: (_: any, record: tableGroupUserDataType) => (
        <span>{record.code}</span>
      ),
      className: "wrap-text",
      width: 400,
    },
    {
      title: "Tên nhóm người sử dụng",
      dataIndex: "code",
      render: (_: any, record: tableGroupUserDataType) => (
        <span>{record.name}</span>
      ),
      className: "wrap-text",
      width: 550,
    },
    {
      title: "Nhóm quyền",
      dataIndex: "roleNames",
      width: "100px",
      render: (_: any, record: tableGroupUserDataType) => {
        return (
          <>
            {record.roleNames != null &&
              record.roleNames.length > 0 &&
              record.roleNames.map((e, index) => (
                <Tag className="mb-1" color="cyan" key={index}>
                  {e}
                </Tag>
              ))}
          </>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableGroupUserDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Phân nhóm quyền",
            key: "3",
            icon: <UserAddOutlined />,
            onClick: () => {
              setCurrentGroupUser(record);
              setIsEditGroupUserRole(true);
            },
          },
          {
            label: "Chỉnh sửa",
            key: "4",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            label: "Xóa",
            key: "5",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setOpenPopconfirmId(record.id ?? ""),
          },
          {
            type: "divider",
          },
        ];

        return (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                onClick={(e) => e.preventDefault()}
                color="primary"
                size="small"
              >
                <Space>
                  Thao tác
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Popconfirm
              title="Xác nhận xóa"
              description="Bạn có chắc chắn muốn xóa?"
              okText="Xóa"
              cancelText="Hủy"
              open={openPopconfirmId === record.id}
              onConfirm={() => {
                handleDeleteModule(record.id || "");
                setOpenPopconfirmId(null);
              }}
              onCancel={() => setOpenPopconfirmId(null)}
            ></Popconfirm>
          </>
        );
      },
    },
  ];

  const getDepartmentDropdown = async () => {
    try {
      const response =
        await departmentService.getHierarchicalDropdownListByUserDepartment();
      setDepartmentDropdown(response.data);
    } catch (error) {}
  };

  const hanleCreateEditSuccess = () => {
    handleGetListModule();
  };

  const handleDeleteModule = async (id: string) => {
    try {
      const response = await groupUserService.Delete(id);

      if (response.status) {
        message.success(
          response.message ?? "Xóa nhóm người sử dụng thành công"
        );
        handleGetListModule();
      } else {
        message.error(response.message ?? "Xóa nhóm người sử dụng thất bại");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error);
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchGroupUserData>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleGetListModule(values);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleGetListModule = useCallback(
    async (searchDataOverride?: searchGroupUserData) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        };
        const response = await groupUserService.getDataByPage(searchData);

        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListModule(items);
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
          dispatch(setIsLoading(false));
        }
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );

  const handleShowModal = (
    isEdit?: boolean,
    module?: tableGroupUserDataType
  ) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentGroupUser(module);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentGroupUser(null);
  };

  useEffect(() => {
    handleGetListModule();
  }, [handleGetListModule]);

  useEffect(() => {
    getDepartmentDropdown();
  }, []);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="mb-2 flex-wrap justify-content-end"
      >
        <AutoBreadcrumb />
        <div>
          <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
            className={classes.mgright5}
          >
            {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
          </Button>

          <Button
            onClick={() => {
              handleShowModal();
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
          >
            Thêm mới
          </Button>
          <CreateOrUpdate
            isOpen={isOpenModal}
            onSuccess={hanleCreateEditSuccess}
            onClose={handleClose}
            GroupUser={currentGroupUser}
            isAdmin={isAdmin}
            dropdownDepartment={departmentDropdown}
          />
        </div>
      </Flex>
      {isPanelVisible && (
        <Search
          onFinish={onFinishSearch}
          dropdownDepartment={departmentDropdown}
          isAdmin={isAdmin}
        />
      )}
      {/* <QLModuleDetail
        user={currentDetailModule}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      /> */}

      <EditUserGroupRole
        groupUser={currentGroupUser}
        isOpen={isEditGroupUserRole}
        onClose={() => setIsEditGroupUserRole(false)}
        onSuccess={hanleCreateEditSuccess}
      />

      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listModule}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={false}
            loading={loading}
          />
        </div>
        <Pagination
          className="mt-2"
          total={dataPage?.totalCount}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} trong ${total} dữ liệu`
          }
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(e) => {
            setPageIndex(e);
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageIndex(current);
            setPageSize(pageSize);
          }}
          size="small"
          align="end"
        />
      </Card>
    </>
  );
};

export default withAuthorization(QLGroupUser, "QLGroupUser");
