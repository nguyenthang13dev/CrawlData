import { createConstant } from "./Constant";

const TrangThaiXuLyConstant = createConstant(
    {
        DAXULY: "DAXULY",
        CHUAXULY: "CHUAXULY",
        DADUYET: "DADUYET",
        DAHUY: "DAHUY",
        CHOPHEDUYET: "CHOPHEDUYET",
        DANGXULY: "DANGXULY",
        TRAVE_NGUOIXULYTRUOC: "TRAVE_NGUOIXULYTRUOC",
        CHUADUYET: "CHUADUYET",
        CHUATRAVE: "CHUATRAVE",
        DATRAVE: "DATRAVE",
        DATRINH: "DATRINH",
    },

    {
        DAXULY: { displayName: "Đã xử lý" },
        CHUAXULY: { displayName: "Chưa xử lý" },
        DADUYET: { displayName: "Đã phê duyệt" },
        DAHUY: { displayName: "Đã hủy" },
        CHOPHEDUYET: { displayName: "Chờ phê duyệt" },
        DANGXULY: { displayName: "Đang xử lý" },
        TRAVE_NGUOIXULYTRUOC: { displayName: "Trả về người xử lý trước" },
        CHUADUYET: { displayName: "Chờ duyệt" },
        CHUATRAVE: { displayName: "Chờ trả về" },
        DATRINH: { displayName: "Đã trình" },
        DATRAVE: { displayName: "Đã trả về" },
    }
)

export default TrangThaiXuLyConstant;