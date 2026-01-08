const VaiTroConstant = {
  ChuyenVienPhong: "CV_PHONG",
  Admin: "Admin",
  SubAmin: "SubAmin",
  FileManager: "FILEMANAGER",
  PhoChanhThanhTra: "PHOCHANHTHANHTRA",
  ThanhTraVien: "THANHTRAVIEN",
  ChanhThanhTra: "CHANHTHANHTRA",
  CBQLSoDonThu: "CBQLSODONTHU",
  QuanlyLuuTruBQP: "QUANLYLUUTRUBQP",
  QuanLyPhongBan: "QUANLYPHONGBAN",
  ChuyenVienLuuTru: "CHUYENVIENLUUTRU",
  CanBoTiepCongDan: "CANBOTIEPCONGDAN",
};

export default VaiTroConstant;

export function hasRole(stringRole: string, roleList: string[]): boolean {
  if (!stringRole || !roleList || roleList.length === 0) {
    return false;
  }
  return roleList.includes(stringRole);
}
