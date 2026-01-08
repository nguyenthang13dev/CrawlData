import { createConstant } from "./Constant";
const KieuHienThiXuLyConstant = createConstant(
  {
    CHON_NGUOIXULY: "CHON_NGUOIXULY",
    TRAVE_NGUOIXULYTRUOC: "TRAVE_NGUOIXULYTRUOC",
    DUYET: "CAPNHATTRANGTHAI",
  },
  {
    CHON_NGUOIXULY: { displayName: "Chọn người xử lý" },
    TRAVE_NGUOIXULYTRUOC: { displayName: "Trả Về người xử lý trước" },
    DUYET: { displayName: "CAPNHATTRANGTHAI" },
  }
 
);
export default KieuHienThiXuLyConstant;
