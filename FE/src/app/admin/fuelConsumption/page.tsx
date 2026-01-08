"use client";
import Flex from "@/components/shared-components/Flex";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import withAuthorization from "@/libs/authentication";
import fuelConsumptionService from "@/services/fuelConsumption/fuelConsumption.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import { FuelConsumptionSearch, FuelConsumptionType } from "@/types/fuelConsumption/fuelConsumption";
import { ResponsePageInfo } from "@/types/general";
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
        FormProps,
        MenuProps,
        Pagination,
        Popconfirm,
        Space,
        Table,
        TableProps,
        Tooltip,
    } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateOrUpdate from "./createOrUpdate";
import classes from "./page.module.css";
import Search from "./search";

const FuelConsumptionPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [listData, setListData] = useState<FuelConsumptionType[]>([]);
    const [dataPage, setDataPage] = useState<ResponsePageInfo>();
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const [searchValues, setSearchValues] = useState<FuelConsumptionSearch | null>(null);
    const loading = useSelector((state) => state.general.isLoading);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const [currentRecord, setCurrentRecord] = useState<FuelConsumptionType | null>(null);
    const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null);

    const tableColumns: TableProps<FuelConsumptionType>["columns"] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Lịch trình",
            dataIndex: "scheduleName",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Công trình",
            dataIndex: "typeConst",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Biển số",
            dataIndex: "plateNumber",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Ngày xuất",
            dataIndex: "actionDateStr",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Khối lượng (M3)",
            dataIndex: "volumeM3",
            render: (val) => <span>{val}</span>,
        },

        {
            title: "Số chuyến",
            dataIndex: "tripCount",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Số KM",
            dataIndex: "distanceKm",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Tiêu thụ (Lít)",
            dataIndex: "consumedFuel",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "Định mức (L/Km)",
            dataIndex: "fuelRate",
            render: (val) => <span>{val}</span>,
        },
        {
            title: "",
            dataIndex: "actions",
            fixed: "right",
            render: (_: any, record: FuelConsumptionType) => {
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
                        key: "delete",
                        danger: true,
                        icon: <DeleteOutlined />,
                        onClick: () => setOpenPopconfirmId(record.id),
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
                            description="Bạn có muốn xóa bản ghi này?"
                            okText="Xóa"
                            cancelText="Hủy"
                            open={openPopconfirmId === record.id}
                            onConfirm={() => {
                                handleDelete(record.id);
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
            const response = await fuelConsumptionService.delete(id);

            if (response.status) {
                toast.success("Xóa thành công");
                handleGetList();
            } else {
                toast.error("Xóa thất bại");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra: " + error);
        }
    };

    const toggleSearch = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    const onFinishSearch: FormProps<FuelConsumptionSearch>["onFinish"] = async (
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
        async (searchDataOverride?: FuelConsumptionSearch) => {
            dispatch(setIsLoading(true));
            try {
                const searchData = searchDataOverride || {
                    pageIndex,
                    pageSize,
                    ...(searchValues || {}),
                } as FuelConsumptionSearch;

                const response = await fuelConsumptionService.getData(searchData);
                if (response != null && response.data != null) {
                    const data = response.data;
                    const items = data.items;
                    setListData(items);
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

    const handleShowModal = (isEdit?: boolean, item?: FuelConsumptionType) => {
        setIsOpenModal(true);
        if (isEdit && item) {
            setCurrentRecord(item);
        } else {
            setCurrentRecord(null);
        }
    };

    const handleExport = async () => {
        try {
            const searchData = {
                ...(searchValues || {}),
            } as FuelConsumptionSearch;
            const blob = await fuelConsumptionService.exportExcel(searchData);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement( "a" );
            link.href = url;
            link.setAttribute( "download", `FuelConsumption_${new Date().toISOString()}.xlsx` );
            document.body.appendChild( link );
            link.click();
            link.parentNode?.removeChild( link );
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xuất file: " + error);
        }   
    };

    const handleClose = () => {
        setIsOpenModal(false);
        setCurrentRecord(null);
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
                        fuelConsumption={currentRecord}
                    />

                    <Tooltip title="Tìm kiếm dữ liệu ở thanh tìm kiếm và kết xuất" color="primary" key="primary">
                        <Button type="primary"
                            icon={<FileExcelOutlined />}
                            onClick={() =>
                            {
                                handleExport();
                            }}
                            size="small">
                                
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
                        dataSource={listData}
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

export default withAuthorization(FuelConsumptionPage, "");
