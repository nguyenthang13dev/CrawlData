import { createConstant } from './Constant'
const HinhThucKhaiBaoConstant = createConstant(
  {
    KeKhaiTrucTuyen: "KE_KHAI_TRUC_TUYEN",
    UploadFile: "UPLOADFILE"
  },
  {
    "KE_KHAI_TRUC_TUYEN": { displayName: 'Kê khai trực tuyến' },
    "UPLOADFILE": { displayName: 'Upload file' }
  }
)
export default HinhThucKhaiBaoConstant
