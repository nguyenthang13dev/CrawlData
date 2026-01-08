// src/utils/validationRules.ts

import { Rule } from 'antd/es/form';

/**
 * Regex cho phép chữ cái (bao gồm tiếng Việt), số, khoảng trắng và các ký tự phân cách phổ biến.
 */
const COMMON_TEXT_INPUT_PATTERN = /^[\p{L}\p{N}\s.,/()-]*$/u;
/**
 * Tạo một quy tắc validation để kiểm tra chuỗi ký tự thông thường.
 * Ngăn chặn các ký tự đặc biệt không mong muốn.
 * @param fieldName - Tên của trường để hiển thị trong thông báo lỗi (ví dụ: 'Kỳ thực hiện'). Mặc định là 'Trường này'.
 * @returns Một đối tượng Rule của Ant Design.
 */
export const commonTextInputRule = (fieldName: string = 'Trường này'): Rule => ({
    pattern: COMMON_TEXT_INPUT_PATTERN,
    message: `${fieldName} chỉ được chứa chữ, số và các ký tự thông dụng như / , . -`
});

/**
 * Quy tắc validate số điện thoại cho kho lưu trữ:
 * - Cho phép nhập toàn số 0 hoặc có khoảng trắng
 * - Phải bắt đầu bằng số 0, chỉ chứa số và khoảng trắng
 * - Không bắt buộc nhập
 * - Tối đa 50 ký tự
 */
export const warehousePhoneNumberRule: Rule = {
    max: 50,
    message: 'Số điện thoại không được vượt quá 50 ký tự',
};

export const warehousePhoneNumberCustomValidator: Rule = {
    validator: (_, value: string) => {
        // Bỏ qua nếu không có giá trị
        if (!value || value.trim() === '') {
            return Promise.resolve();
        }

        // 1. Cập nhật Regex: Chỉ cho phép số, không cho phép khoảng trắng.
        const pattern = /^0[0-9]*$/;
        if (!pattern.test(value)) {
            // Cập nhật thông báo lỗi cho phù hợp
            return Promise.reject(new Error('Số điện thoại phải bắt đầu bằng số 0 và chỉ được chứa chữ số.'));
        }

        // 2. Giữ nguyên logic kiểm tra không được toàn số 0
        const hasNonZeroDigit = /[1-9]/.test(value);
        if (!hasNonZeroDigit) {
            return Promise.reject(new Error('Số điện thoại không hợp lệ vì không được chỉ chứa số 0.'));
        }

        return Promise.resolve();
    }
};


export const commonTextLengInputRule = (fieldName: string, maxLength: number = 200): Rule[] => [
    { whitespace: true, message: `${fieldName} không được để trống.` },
    { max: maxLength, message: `${fieldName} không được vượt quá ${maxLength} ký tự.` },
    {
        pattern: COMMON_TEXT_INPUT_PATTERN,
        message: `${fieldName} chỉ được chứa chữ, số và các ký tự thông dụng như / , . -`
    }
];

/**
 * Rule dùng chung để chặn dán (paste) vượt quá maxLength và báo lỗi ngay lập tức.
 * Sử dụng cho Input của Ant Design.
 */
export const getPasteMaxLengthHandler = (
  formInstance: any,
  fieldName: string,
  maxLength: number = 255,
  errorMsg: string = `Không được vượt quá ${maxLength} ký tự khi dán!`
) => (e: React.ClipboardEvent<HTMLInputElement>) => {
  const paste = e.clipboardData.getData('text');
  const input = e.currentTarget.value;
  if ((input.length + paste.length) > maxLength) {
    e.preventDefault();
    formInstance.setFields([
      {
        name: fieldName,
        errors: [errorMsg],
      },
    ]);
  }
};
