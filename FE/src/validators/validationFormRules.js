export const rules = {
  // Trường bắt buộc
  required: { required: true, message: "Vui lòng nhập thông tin này!" },

  // Không cho nhập HTML, JS
  htmlJs: {
    pattern:
      /^(?!.*(<\s*script|<\s*iframe|javascript:|vbscript:|data:text\/html|on\w+\s*=|<\/?\s*\w+\s*>)).*$/i,
    message: "Không được nhập mã HTML hoặc JavaScript!",
  },

  // Cho phép chữ, số, khoảng trắng, dấu chấm, phẩy, /, (, ), -
  specialCharacter: {
    pattern: /^[^$@&*%#!]+$/,
    message: "Không được nhập ký tự đặc biệt như $,&,@,*,%,#,!...",
  },

  // Không được chứa dấu tiếng Việt
  vietnamese: {
    pattern:
      /^[^\u0300-\u036fàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]+$/i,
    message: "Không được chứa dấu tiếng Việt!",
  },

  // Kiểm tra chỉ nhập khoảng trắng
  onlySpaces: {
    validator: (_, value) => {
      if (value && value.trim().length === 0) {
        return Promise.reject("Lỗi khoảng trắng!");
      }
      return Promise.resolve();
    },
  },

  // Lỗi khoảng trắng
  spaces: {
    validator: (_, value) => {
      // toàn khoảng trắng -> lỗi
      if (value && value.trim().length === 0) {
        return Promise.reject("Lỗi khoảng trắng");
      }

      // khoảng trắng ở giữa
      const hasMiddleSpace = /^\s*\S+\s+\S+.*$/.test(value);
      if (hasMiddleSpace) {
        return Promise.reject("Không được có khoảng trắng ở giữa!");
      }

      return Promise.resolve();
    },
  },

  // Email hợp lệ
  email: {
    validator: (_, value) => {
      const trimmed = value?.trim?.() || ""; // Loại bỏ khoảng trắng trước/sau
      const errors = [];

      // Nếu có giá trị sau khi trim
      if (trimmed.length > 0) {
        // Kiểm tra HTML, JavaScript
        if (
          /(<\s*script|<\s*iframe|javascript:|vbscript:|data:text\/html|on\w+\s*=|<\/?\s*\w+\s*>)/i.test(
            trimmed
          )
        ) {
          errors.push("Nhập sai định dạng dữ liệu\n");
        }

        // Kiểm tra độ dài
        if (trimmed.length < 6 || trimmed.length > 30) {
          errors.push("Độ dài từ 6 đến 30 ký tự!\n");
        }

        // Kiểm tra ký tự đặc biệt
        if (/[-&=_\',+,<>]/i.test(trimmed)) {
          errors.push(
            "Không được nhập ký tự đặc biệt như -, &, =, _, ', +, ,, <, >!\n"
          );
        }

        // kiểm tra dấu tiếng việt
        if (
          /[\u0300-\u036fàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(
            trimmed
          )
        ) {
          errors.push("Không được nhập ký tự có dấu\n");
        }

        // Kiểm tra chữ hoa
        if (/[A-Z]/.test(trimmed)) {
          errors.push("Không được nhập chữ hoa!\n");
        }

        // Kiểm tra dấu .
        if (trimmed.startsWith(".")) {
          errors.push("Không được bắt đầu bằng dấu chấm!\n");
        }
        if (trimmed.endsWith(".")) {
          errors.push("Không được kết thúc bằng dấu chấm!\n");
        }
        if (/\.\./.test(trimmed)) {
          errors.push("Không được chứa nhiều dấu chấm liên tiếp!\n");
        }

        // Kiểm tra định dạng email cơ bản
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
          if (!trimmed.includes("@")) {
            errors.push("Phải chứa ký tự @\n");
          }
          if (!trimmed.includes(".")) {
            errors.push("Phải chứa tên miền hợp lệ (ví dụ: .com)\n");
          }
          if (errors.length === 0) {
            errors.push("Địa chỉ email không hợp lệ!\n");
          }
        }
      }

      return errors.length ? Promise.reject(errors) : Promise.resolve();
    },
  },

  // Validator số điện thoại
  phone: {
    validator: (_, value) => {
      const trimmed = value?.trim?.() || "";

      const errors = [];

      if (trimmed.length > 0) {
        // Nếu không bắt đầu bằng '+' hoặc có dấu '+' nhưng xuất hiện ở vị trí khác
        if (!/^[+0]/.test(trimmed)) {
          errors.push("Số điện thoại phải bắt đầu bằng số 0 hoặc dấu + \n");
        }

        if (
          (!trimmed.startsWith("+") || trimmed.indexOf("+") > 0) &&
          /[<>\/{}[\]'"`;]|script|alert|\(|\)|[@#$%^&*!~+]/i.test(trimmed)
        ) {
          errors.push("Không được nhập ký tự đặc biệt \n");
        }

        // Ký tự không phải số
        if (!/^\+?\d*$/.test(trimmed)) {
          errors.push("Chỉ được nhập số, trừ dấu + chỉ được phép nhập ở đầu");
        }

        // Tất cả là số 0
        if (!/^0[1-9]/.test(trimmed)) {
          errors.push("Số điện thoại không đúng định dạng\n");
        }

        // Kiểm tra độ dài hợp lệ
        if (trimmed.startsWith("+")) {
          const digitsOnly = trimmed.replace(/^\+/, "");
          if (digitsOnly.length !== 11) {
            errors.push("Số điện thoại có 10 chữ số \n");
          }
        } else {
          if (trimmed.length !== 10) {
            errors.push("Số điện thoại có 10 chữ số \n");
          }
        }
      }

      return errors.length ? Promise.reject(errors) : Promise.resolve();
    },
  },

  // Validator CMTND/CCCD
  idCard: {
    validator: (_, value) => {
      const trimmed = value?.trim?.() || "";
      const errors = [];

      if (trimmed.length > 0) {
        // Không được nhập ký tự đặc biệt
        if (/[^0-9]/.test(trimmed)) {
          errors.push("Chỉ được nhập chữ số!");
        }

        // Kiểm tra độ dài hợp lệ (9 hoặc 12 số)
        if (trimmed.length !== 9 && trimmed.length !== 12) {
          errors.push("CMTND/CCCD phải có 9 hoặc 12 chữ số!");
        }

        // Không được toàn số 0
        if (/^0+$/.test(trimmed)) {
          errors.push("Không được nhập toàn số 0!");
        }

        // Không được chứa HTML/JS
        if (
          /(<\s*script|<\s*iframe|javascript:|vbscript:|data:text\/html|on\w+\s*=|<\/?\s*\w+\s*>)/i.test(
            trimmed
          )
        ) {
          errors.push("Không được nhập mã HTML hoặc JavaScript!");
        }
      }

      return errors.length ? Promise.reject(errors) : Promise.resolve();
    },
  },

  // Viết tiếp ở đây
  longContent: {
    max: 1000,
    message: "Nội dung tìm kiếm quá dài",
    warningOnly: true,
  },

  maxContent: {
    max: 255,
    message: "Không được nhập quá 255 ký tự.",
  },

  // Không được nhập số âm
  noNegativeNumber: {
    validator: (_, value) => {
      if (value !== undefined && value !== null && value !== "") {
        const num = Number(value);
        if (!isNaN(num) && num < 0) {
          return Promise.reject("Không được nhập số âm!");
        }
      }
      return Promise.resolve();
    },
  },
};

export const groupRules = {
  input: [rules.htmlJs, rules.specialCharacter, rules.onlySpaces],
  textArea: [rules.htmlJs, rules.specialCharacter, rules.onlySpaces],
  code: [
    rules.required,
    rules.htmlJs,
    rules.specialCharacter,
    rules.spaces,
    rules.vietnamese,
  ],
  name: [
    rules.required,
    rules.htmlJs,
    rules.specialCharacter,
    rules.onlySpaces,
  ],
};

export const createNumberRangeRule = (options) => ({
  validator: (_, value) => {
    if (value === undefined || value === null || value === "") {
      return Promise.resolve(); // Cho phép bỏ trống, dùng kết hợp với `required` nếu cần
    }

    const num = Number(value);
    if (isNaN(num)) {
      return Promise.reject("Giá trị phải là số hợp lệ!");
    }

    if (num < 0) {
      return Promise.reject("Không được nhập số âm!");
    }

    const { min, max } = options;

    if (typeof min === "number" && num < min) {
      return Promise.reject(`Giá trị phải lớn hơn hoặc bằng ${min}!`);
    }

    if (typeof max === "number" && num > max) {
      return Promise.reject(`Giá trị phải nhỏ hơn hoặc bằng ${max}!`);
    }

    return Promise.resolve();
  },
});

//Ghi_Chu

// check tên: groupRules.name

// check mã:  groupRules.code

// check email: rules.required (nếu cần require), rules.onlySpaces, rules.email

// check phone: (nếu cần require), rules.onlySpaces, rules.phone
