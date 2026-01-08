"use client";
import { useCallback, useEffect, useState } from "react";
import Flex from "@/components/shared-components/Flex";
import { PagedList } from "@/types/general";
import withAuthorization from "@/libs/authentication";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import * as extensions from "@/utils/extensions";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Dropdown,
  FormProps,
  MenuProps,
  message,
  Modal,
  Pagination,
  Space,
  Switch,
  Table,
  TableProps,
} from "antd";
import { useDispatch } from "react-redux";
import ThemeConfigDetail from "./detail";
import Search from "./search";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import {
  ThemeConfigSearchType,
  ThemeConfigType,
} from "@/types/themeConfig/themeConfig";
import { themeConfigService } from "@/services/themeConfig/themeConfigService";
import ThemeConfigCreateOrUpdate from "./createOrUpdate";
import Link from "next/link";
const { confirm } = Modal;

const ThemeConfigPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<PagedList<ThemeConfigType>>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] =
    useState<ThemeConfigSearchType | null>(null);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentItem, setCurentItem] = useState<ThemeConfigType | null>(null);
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleToggleConfig = (id: string) => {
    confirm({
      title: "Bạn muốn bật/tắt cấu hình giao diện?",
      icon: <InfoCircleOutlined />,
      content: "Thao tác này sẽ thay đổi trạng thái hoạt động của cấu hình",
      onOk: async () => {
        try {
          const response = await themeConfigService.toggleConfig(id);
          if (response.status) {
            message.success("Cập nhật trạng thái thành công");
            location.reload();
          }
        } catch (err) {
          message.error("Lỗi hệ thống, vui lòng thử lại");
        }
      },
      onCancel() {},
    });
  };

  const tableColumns: TableProps<ThemeConfigType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      render: (_: any, record: ThemeConfigType) => <span>{record.name}</span>,
    },
    {
      title: "Màu chủ đạo",
      dataIndex: "colorPrimary",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker defaultValue={record.colorPrimary} showText disabled />
      ),
    },
    {
      title: "Màu hover",
      dataIndex: "colorPrimaryHover",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker
          defaultValue={record.colorPrimaryHover}
          showText
          disabled
        />
      ),
    },
    {
      title: "Màu active",
      dataIndex: "colorPrimaryActive",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker
          defaultValue={record.colorPrimaryActive}
          showText
          disabled
        />
      ),
    },
    {
      title: "Font chữ",
      dataIndex: "fontFamily",
      render: (_: any, record: ThemeConfigType) => (
        <span>{record.fontFamily}</span>
      ),
    },
    {
      title: "Bo góc",
      dataIndex: "borderRadius",
      render: (_: any, record: ThemeConfigType) => (
        <span>{record.borderRadius}</span>
      ),
    },
    {
      title: "Màu border",
      dataIndex: "colorBorder",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker defaultValue={record.colorBorder} showText disabled />
      ),
    },
    {
      title: "Màu chữ gợi ý input",
      dataIndex: "colorTextPlaceholder",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker
          defaultValue={record.colorTextPlaceholder}
          showText
          disabled
        />
      ),
    },
    {
      title: "Màu chữ",
      dataIndex: "colorText",
      render: (_: any, record: ThemeConfigType) => (
        <ColorPicker defaultValue={record.colorText} showText disabled />
      ),
    },
    {
      title: "Hoạt động",
      dataIndex: "isActive",
      render: (_: any, record: ThemeConfigType) => (
        <Switch
          checkedChildren="Bật"
          unCheckedChildren="Tắt"
          defaultChecked={record.isActive}
          onClick={() => handleToggleConfig(record.id)}
        />
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      fixed: "right",
      align: "center",
      render: (_: any, record: ThemeConfigType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chỉnh sửa",
            key: "3",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            type: "divider",
          },
          {
            label: "Xóa",
            key: "4",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setConfirmDeleteId(record.id ?? ""),
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
          </>
        );
      },
    },
  ];

  const hanleCreateEditSuccess = () => {
    handleLoadData();
    setCurentItem(null);
  };

  const handleDelete = async () => {
    const response = await themeConfigService.delete(confirmDeleteId ?? "");
    if (response.status) {
      message.success("Xóa thành công");
      handleLoadData();
    }
    setConfirmDeleteId(null);
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<ThemeConfigSearchType>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleLoadData(values);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleLoadData = useCallback(
    async (searchDataOverride?: ThemeConfigSearchType) => {
      dispatch(setIsLoading(true));

      const searchData = searchDataOverride || {
        pageIndex,
        pageSize,
        ...(searchValues || {}),
      };
      const response = await themeConfigService.getData(searchData);
      if (response != null && response.data != null) {
        const data = response.data;
        setData(data);
      }
      dispatch(setIsLoading(false));
    },
    [dispatch, pageIndex, pageSize, searchValues]
  );

  const handleShowModal = (isEdit?: boolean, item?: ThemeConfigType) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurentItem(item ?? null);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurentItem(null);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className="mb-2 flex-wrap justify-content-end"
      >
        <AutoBreadcrumb />
        <div className="btn-group">
          <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
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
            className="mr-2"
          >
            Thêm mới
          </Button>
          <Link href="/dashboard">
            <Button type="primary" size="small" icon={<ArrowLeftOutlined />}>
              Quay lại
            </Button>
          </Link>
          {isOpenModal && (
            <ThemeConfigCreateOrUpdate
              onSuccess={hanleCreateEditSuccess}
              onClose={handleClose}
              item={currentItem}
            />
          )}
        </div>
      </Flex>
      {isPanelVisible && (
        <Search
          onFinish={onFinishSearch}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      )}
      {isOpenDetail && (
        <ThemeConfigDetail item={currentItem} onClose={handleCloseDetail} />
      )}

      {confirmDeleteId && (
        <Modal
          title="Xác nhận xóa"
          open={true}
          onOk={handleDelete}
          onCancel={() => setConfirmDeleteId(null)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa mục này?</p>
        </Modal>
      )}
      <Card className={"customCardShadow"}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={data?.items}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={false}
            loading={loading}
          />
        </div>
        <Pagination
          className="mt-2"
          total={data?.totalCount}
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

export default withAuthorization(ThemeConfigPage, "");
