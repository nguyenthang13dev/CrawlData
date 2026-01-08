// Hàm chuyển đổi chuỗi có dấu thành không dấu => tìm kiếm tiếng Việt ở drropdown
export const removeAccents = (str: string): string => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D").trim();
};