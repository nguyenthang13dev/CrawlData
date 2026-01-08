"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import withAuthorization from "@/libs/authentication";
import vehicleService from "@/services/vehicle/vehicle.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { ResponsePageInfo } from "@/types/general";
import { VehicleType, VehicleTypeSearch } from "@/types/vehicle/vehicle";
import
  {
    CloseOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    InfoCircleOutlined,
    PlusCircleOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import
  {
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
  } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateOrUpdate from "./createOrUpdate";
import VehicleDetail from "./detail";
import classes from "./page.module.css";
import Search from "./search";

const VehiclePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [listVehicle, setListVehicle] = useState<VehicleType[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<VehicleTypeSearch | null>(null);
  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [currentVehicle, setCurrentVehicle] = useState<VehicleType | null>(null);
  const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);


  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const tableColumns: TableProps<VehicleType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên phương tiện",
      dataIndex: "name",
      render: (_: any, record: VehicleType) => <span>{record.name}</span>,
    },
    {
      title: "Biển số",
      dataIndex: "plateNumber",
      render: (_: any, record: VehicleType) => <span>{record.plateNumber}</span>,
    },
    {
      title: "Tiêu thụ nhiên liệu (l/km)",
      dataIndex: "consumerFuel",
      render: (_: any, record: VehicleType) => <span>{record.consumerFuel}</span>,
    },
    {
      title: "Loại phương tiện",
      dataIndex: "typeCategory",
      render: (_: any, record: VehicleType) => <span>{record.typeCategory}</span>,
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: VehicleType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chỉnh sửa",
            key: "edit",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            label: "Chi tiết",
            key: "DETAIL",
            icon: <InfoCircleOutlined />,
            onClick: () => {
              setCurrentVehicle(record);
              setIsDetailOpen(true);
            },
          },
          {
            label: "Xóa",
            key: "2",
            danger: true,
            icon: <DeleteOutlined />,
            onClick: () => setOpenPopconfirmId(record.id ?? ""),
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
              description="Bạn có muốn xóa phương tiện này?"
              okText="Xóa"
              cancelText="Hủy"
              open={openPopconfirmId === record.id}
              onConfirm={() => {
                handleDelete(record.id || "");
                setOpenPopconfirmId(null);
              }}
              onCancel={() => setOpenPopconfirmId(null)}
            ></Popconfirm>
          </>
        );
      },
    },
  ];

  const handleCreateEditSuccess = () => {
    handleGetList();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await vehicleService.delete(id);

      if (response.status) {
        toast.success("Xóa phương tiện thành công");
        handleGetList();
      } else {
        toast.error("Xóa phương tiện thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<VehicleTypeSearch>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleGetList(values);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  const handleGetList = useCallback(
    async (searchDataOverride?: VehicleTypeSearch) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          ...(searchValues || {}),
        } as VehicleTypeSearch;

        const response = await vehicleService.getData(searchData);
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListVehicle(items);
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
    [pageIndex, pageSize, searchValues, dispatch]
  );

  const handleShowModal = (isEdit?: boolean, item?: VehicleType) => {
    setIsOpenModal(true);
    if (isEdit && item) {
      setCurrentVehicle(item);
    } else {
      setCurrentVehicle(null);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setCurrentVehicle(null);
  };

  useEffect(() => {
    handleGetList();
  }, [handleGetList]);

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
            onSuccess={handleCreateEditSuccess}
            onClose={handleClose}
            vehicle={currentVehicle}
          />
        </div>
      </Flex>
      {isPanelVisible && <Search onFinish={onFinishSearch} />}

      {
        isDetailOpen && (
          <VehicleDetail
            vehicle={currentVehicle}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
          />
        )
      }

      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listVehicle}
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

export default withAuthorization(VehiclePage, "");
