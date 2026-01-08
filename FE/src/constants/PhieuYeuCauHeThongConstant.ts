/**
 * Constants for Phieu Yeu Cau He Thong (System Request Form)
 */

/**
 * Trạng thái duyệt mượn tài liệu
 */
export const TrangThaiChapThuan = {
    /**
     * Chờ duyệt
     */
    CHO_DUYET: 'CHO_DUYET',

    /**
     * Đã duyệt
     */
    DA_DUYET: 'DA_DUYET',

    /**
     * Từ chối
     */
    TU_CHOI: 'TU_CHOI'
};

/**
 * Trạng thái trả hồ sơ
 */
export const TrangThaiTra = {
    /**
     * Chưa mượn
     */
    CHUA_MUON: 'CHUA_MUON',

    /**
     * Chưa trả
     */
    CHUA_TRA: 'CHUA_TRA',

    /**
     * Đã nhận
     */
    DA_NHAN: 'DA_NHAN',

    /**
     * Từ chối nhận
     */
    TU_CHOI_NHAN: 'TU_CHOI_NHAN'
};

/**
 * Labels for TrangThaiChapThuan
 */
export const TrangThaiChapThuanLabels = {
    [TrangThaiChapThuan.CHO_DUYET]: 'Chờ duyệt',
    [TrangThaiChapThuan.DA_DUYET]: 'Đã duyệt',
    [TrangThaiChapThuan.TU_CHOI]: 'Từ chối'
};

/**
 * Labels for TrangThaiTra
 */
export const TrangThaiTraLabels = {
    [TrangThaiTra.CHUA_MUON]: 'Chưa mượn',
    [TrangThaiTra.CHUA_TRA]: 'Chưa trả',
    [TrangThaiTra.DA_NHAN]: 'Đã nhận',
    [TrangThaiTra.TU_CHOI_NHAN]: 'Từ chối nhận'
};

/**
 * Options for dropdown selection of TrangThaiChapThuan
 */
export const TrangThaiChapThuanOptions = [
    {value: TrangThaiChapThuan.CHO_DUYET, label: TrangThaiChapThuanLabels[TrangThaiChapThuan.CHO_DUYET]},
    {value: TrangThaiChapThuan.DA_DUYET, label: TrangThaiChapThuanLabels[TrangThaiChapThuan.DA_DUYET]},
    {value: TrangThaiChapThuan.TU_CHOI, label: TrangThaiChapThuanLabels[TrangThaiChapThuan.TU_CHOI]}
];

/**
 * Options for dropdown selection of TrangThaiTra
 */
export const TrangThaiTraOptions = [
    {value: TrangThaiTra.CHUA_MUON, label: TrangThaiTraLabels[TrangThaiTra.CHUA_MUON]},
    {value: TrangThaiTra.CHUA_TRA, label: TrangThaiTraLabels[TrangThaiTra.CHUA_TRA]},
    {value: TrangThaiTra.DA_NHAN, label: TrangThaiTraLabels[TrangThaiTra.DA_NHAN]},
    {value: TrangThaiTra.TU_CHOI_NHAN, label: TrangThaiTraLabels[TrangThaiTra.TU_CHOI_NHAN]}
];

export default {
    TrangThaiChapThuan,
    TrangThaiTra,
    TrangThaiChapThuanLabels,
    TrangThaiTraLabels,
    TrangThaiChapThuanOptions,
    TrangThaiTraOptions
};
