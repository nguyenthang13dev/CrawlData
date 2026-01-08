import { createConstant } from "./Constant";
const CapXuLyConstant = createConstant(
    {
        ToanHeThong: "ToanHeThong",
        CungCapPhongBan: "CungCapPhongBan",
        CungPhongBan: "CungPhongBan",
    },
    {
        ToanHeThong: { displayName: "Toàn hệ thống" },
        CungCapPhongBan: { displayName: "Cùng cấp phòng ban" },
        CungPhongBan: { displayName: "Cùng phòng ban" },
    }
);
export default CapXuLyConstant;