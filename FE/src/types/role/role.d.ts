export interface roleType {
  id: string | null;
  name: string | null;
  code: string | null;
  type: string | null;
  isActive: boolean;

  isDuyetPhieuChi: boolean;
  isDuyetBaoCaoDoanhThu: boolean;
  isDuyetNopDoanhThu: boolean;
  isNhanTien: boolean;
  isDuyetChuyenCoSo: boolean;
}

export interface tableRoleType {
  id: string;
  name: string | null;
  code: string | null;
  type: string | null;
  isActive: boolean;
  departmentId?: string;
  isDuyetPhieuChi: boolean;
  isDuyetBaoCaoDoanhThu: boolean;
  isDuyetNopDoanhThu: boolean;
  isNhanTien: boolean;
  isDuyetChuyenCoSo: boolean;
}

export interface createEditType {
  id: string | null;
  name: string | null;
  code: string | null;
  type: string | null;
  isActive: boolean;
  departmentId?: string;
  isDuyetPhieuChi: boolean;
  isDuyetBaoCaoDoanhThu: boolean;
  isDuyetNopDoanhThu: boolean;
  isNhanTien: boolean;
  isDuyetChuyenCoSo: boolean;
}

export interface searchRole extends SearchBase {
  name?: string;
  code?: string;
  isShow?: boolean;
  departmentId?: string;
}
