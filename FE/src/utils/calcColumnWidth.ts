// src/utils/calcColumnWidth.ts
export function getUniformColumnWidth(
    data: any[],
    field: string,
    options?: { value: string; label: string }[],
    defaultText: string = "Chưa xác định",
    minWidth: number = 80,
    font: string = '14px ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // cập nhật đúng font thực tế
    padding: number = 40, // tăng padding để sát thực tế hơn
    headerText?: string // New parameter for header text
) {
    // Hàm đo chiều rộng text thực tế
    function measureTextWidth(text: string, font: string) {
        if (typeof window !== 'undefined' && window.document) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
                context.font = font;
                return context.measureText(text).width;
            }
        }
        // fallback nếu không có window (SSR)
        return text.length * 10;
    }

    const TAG_INTERNAL_HORIZONTAL_PADDING = 16; // Typical horizontal padding for an AntD Tag (e.g., padding: 'Xpx 8px' means 8px left + 8px right)
    const TAG_EXTRA_BUFFER = 2; // Small buffer for Tag rendering, applied in snug fit scenarios

    const usedValues: Set<string> = new Set();
    if (data && data.length > 0) {
        data.forEach(item => {
            if (item[field]) {
                usedValues.add(item[field]);
            }
        });
    }

    // Lấy tất cả label thực tế sẽ hiển thị
    let allLabels: string[] = [];
    if (data && data.length > 0) {
        allLabels = data.map(item => {
            if (options) {
                const option = options.find(opt => opt.value === item[field]);
                return option?.label || defaultText;
            }
            return item[field] || defaultText;
        });
    } else {
        allLabels = [defaultText];
    }
    // Nếu options, chỉ lấy label của các option có value xuất hiện trong data (map thực tế)
    if (options && options.length > 0 && usedValues.size > 0) {
        // Lấy các value thực tế xuất hiện trong data (có thể là userIDGiao, userIDNhan, ...)
        const filteredOptions = options.filter(opt => usedValues.has(opt.value));
        // Nếu có option thực tế thì chỉ lấy label của các option này
        if (filteredOptions.length > 0) {
            allLabels = filteredOptions.map(opt => opt.label);
        } else {
            allLabels = [defaultText];
        }
    }

    // Đo chiều rộng lớn nhất từ dữ liệu
    let maxDataTextWidth = 0;
    if (allLabels.length > 0) {
        maxDataTextWidth = Math.max(...allLabels.map(label => measureTextWidth(label, font)));
    }

    // Đo chiều rộng của header text nếu có
    let headerWidth = 0;
    if (headerText) {
        headerWidth = measureTextWidth(headerText, font);
    }

    // Chiều rộng text lớn nhất là max của data và header
    const maxTextWidth = Math.max(maxDataTextWidth, headerWidth);

    let effectivePadding = Math.max(padding, TAG_INTERNAL_HORIZONTAL_PADDING);

    // If the padding is primarily determined by the Tag's own internal padding (snug fit scenario),
    // add a small extra buffer for visual comfort and to prevent minor clipping within the Tag.
    if (padding <= TAG_INTERNAL_HORIZONTAL_PADDING) {
        effectivePadding += TAG_EXTRA_BUFFER;
    }

    const totalCalculatedWidth = Math.ceil(maxTextWidth + effectivePadding);

    // Tính maxWidth hợp lý nếu dữ liệu quá dài
    // Nếu độ dài label lớn hơn 127 ký tự (1/2 của 255), giới hạn maxWidth
    const MAX_HALF_CHAR = 70;
    const MAX_WIDTH = measureTextWidth('W', font) * MAX_HALF_CHAR + padding;

    // Đo chiều rộng lớn nhất của các label
    let maxLabelWidth = minWidth;
    allLabels.forEach(label => {
        const width = measureTextWidth(label, font) + padding;
        if (width > maxLabelWidth) {
            maxLabelWidth = width;
        }
    });
    // Đo chiều rộng header nếu có
    if (headerText) {
        const headerWidth = measureTextWidth(headerText, font) + padding;
        if (headerWidth > maxLabelWidth) {
            maxLabelWidth = headerWidth;
        }
    }
    // Giới hạn maxWidth nếu vượt quá nửa của 255 ký tự
    if (maxLabelWidth > MAX_WIDTH) {
        maxLabelWidth = MAX_WIDTH;
    }
    return Math.ceil(maxLabelWidth);
}
