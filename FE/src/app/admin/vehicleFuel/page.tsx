"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import withAuthorization from "@/libs/authentication";
import vehicleFuelService from "@/services/vehicleFuel/vehicleFuel.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { ResponsePageInfo } from "@/types/general";
import { VehicleFuelSearch, VehicleFuelType } from "@/types/vehicleFuel/vehicleFuel";
import
    {
        CloseOutlined,
        DeleteOutlined,
        DownOutlined,
        EditOutlined,
        FileExcelOutlined,
        PlusCircleOutlined,
        SearchOutlined,
    } from "@ant-design/icons";
import
    {
        Button,
        Card,
        Dropdown,
        MenuProps,
        Pagination,
        Popconfirm,
        Space,
        Table,
        TableProps,
        Tooltip,
    } from "antd";
import { FormProps } from "antd/lib";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateOrUpdate from "./createOrUpdate";
import classes from "./page.module.css";
import Search from "./search";

const VehicleFuelPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [listVehicleFuel, setListVehicleFuel] = useState<VehicleFuelType[]>([]);
    const [dataPage, setDataPage] = useState<ResponsePageInfo>();
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const [searchValues, setSearchValues] = useState<VehicleFuelSearch | null>(null);
    const loading = useSelector((state) => state.general.isLoading);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const [currentVehicleFuel, setCurrentVehicleFuel] = useState<VehicleFuelType | null>(null);
    const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

    const tableColumns: TableProps<VehicleFuelType>["columns"] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Biển số",
            dataIndex: "plateNumber",
            render: (_: any, record: VehicleFuelType) => <span>{record.plateNumber}</span>,
        },
        {
            title: "Định mức (l)",
            dataIndex: "quanlity",
            render: (_: any, record: VehicleFuelType) => <span>{record.quanlity}</span>,
        },
        {
            title: "Loại",
            dataIndex: "type",
            render: (_: any, record: VehicleFuelType) => <span>{record.type}</span>,
        },
        {
            title: "Ngày thực hiện",
            dataIndex: "actionDate",
            render: (_: any, record: VehicleFuelType) => (
                <span>
                    {record.actionDate ? dayjs(record.actionDate).format("DD/MM/YYYY") : ""}
                </span>
            ),
        },
        {
            title: "",
            dataIndex: "actions",
            fixed: "right",
            render: (_: any, record: VehicleFuelType) => {
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
                            description="Bạn có muốn xóa định mức này?"
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
            const response = await vehicleFuelService.delete(id);

            if (response.status) {
                toast.success("Xóa định mức thành công");
                handleGetList();
            } else {
                toast.error("Xóa định mức thất bại");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };

    const toggleSearch = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    const onFinishSearch: FormProps<VehicleFuelSearch>["onFinish"] = async (
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
        async (searchDataOverride?: VehicleFuelSearch) => {
            dispatch(setIsLoading(true));
            try {
                const searchData = searchDataOverride || {
                    pageIndex,
                    pageSize,
                    ...(searchValues || {}),
                } as VehicleFuelSearch;

                const response = await vehicleFuelService.getData(searchData);
                if (response != null && response.data != null) {
                    const data = response.data;
                    const items = data.items;
                    setListVehicleFuel(items);
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

    const handleShowModal = (isEdit?: boolean, item?: VehicleFuelType) => {
        setIsOpenModal(true);
        if (isEdit && item) {
            setCurrentVehicleFuel(item);
        } else {
            setCurrentVehicleFuel(null);
        }
    };

    const handleExport = async () => {
        try {
            const searchData = {
                ...(searchValues || {}),
            } as VehicleFuelSearch;
            const blob = await vehicleFuelService.exportExcel(searchData);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `VehicleFuel_${new Date().toISOString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xuất file: " + error);
        }
    };

    const handleClose = () => {
        setIsOpenModal(false);
        setCurrentVehicleFuel(null);
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
                        className={classes.mgright5}
                    >
                        Thêm mới
                    </Button>
                    <CreateOrUpdate
                        isOpen={isOpenModal}
                        onSuccess={handleCreateEditSuccess}
                        onClose={handleClose}
                        vehicleFuel={currentVehicleFuel}
                    />

                    <Tooltip title="Tìm kiếm dữ liệu ở thanh tìm kiếm và kết xuất" color="primary" key="primary">
                        <Button
                            type="primary"
                            icon={<FileExcelOutlined />}
                            onClick={() => {
                                handleExport();
                            }}
                            size="small"
                        >
                            Kết xuất
                        </Button>
                    </Tooltip>
                </div>
            </Flex>
            {isPanelVisible && <Search onFinish={onFinishSearch} />}

            <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}
                        bordered
                        dataSource={listVehicleFuel}
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

export default withAuthorization(VehicleFuelPage, "");
