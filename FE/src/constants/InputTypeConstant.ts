import
  {
    Calendar,
    CheckSquare,
    Clock,
    Database,
    DollarSign,
    FileText,
    Hash,
    Image,
    Link,
    List,
    Mail,
    MapPin,
    Percent,
    Phone,
    Type,
    Upload,
    User
  } from 'lucide-react';

// Định nghĩa các kiểu trường
export const FieldTypes = {
  Guid: "Guid",
  Text: "StrText",
  Textarea: "StrArea",
  RichEditor: "StrEditor",
  Password: "StrPassword",
  Email: "StrEmail",
  Phone: "StrPhone",
  Number: "Number",
  Decimal: "Decimal",
  DatePicker: "DtDatePicker",
  TimePicker: "DtTimePicker",
  DateTimePicker: "DtDateTimePicker",
  Checkbox: "CheckBox",
  Radio: "Radio",
  Switch: "Switch",
  Dropdown: "Dropdown",
  MultiSelect: "MultiSelect",
  Boolean: "Boolean"
} as const;

type IconType = React.ComponentType<any>;

// Types for aggregate options
export interface AggregateOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  typeQuery?: string;
  isGroup?: boolean;
  category?: 'numeric' | 'text' | 'date' | 'logical' | 'statistical';
}

export interface AggregateCategory {
  category: string;
  label: string;
  options: AggregateOption[];
}

// 1️⃣ Lấy Icon
export function getFieldIcon(fieldType: string, fieldName?: string): IconType {
  // Ưu tiên đoán theo tên trường
  if (fieldName) {
    const lower = fieldName.toLowerCase();
    if (lower.includes('email')) return Mail;
    if (lower.includes('phone') || lower.includes('tel')) return Phone;
    if (lower.includes('name') || lower.includes('title')) return User;
    if (lower.includes('address') || lower.includes('location')) return MapPin;
    if (lower.includes('price') || lower.includes('amount') || lower.includes('cost')) return DollarSign;
    if (lower.includes('percent') || lower.includes('rate')) return Percent;
    if (lower.includes('url') || lower.includes('link')) return Link;
    if (lower.includes('image') || lower.includes('photo')) return Image;
    if (lower.includes('file') || lower.includes('document')) return Upload;
  }

  // Map theo fieldType
  switch (fieldType) {
    case FieldTypes.Email: return Mail;
    case FieldTypes.Phone: return Phone;
    case FieldTypes.Number:
    case FieldTypes.Decimal: return Hash;
    case FieldTypes.DatePicker:
    case FieldTypes.DateTimePicker: return Calendar;
    case FieldTypes.TimePicker: return Clock;
    case FieldTypes.Text:
    case FieldTypes.Password: return Type;
    case FieldTypes.Textarea:
    case FieldTypes.RichEditor: return FileText;
    case FieldTypes.Checkbox:
    case FieldTypes.Switch: return CheckSquare;
    case FieldTypes.Dropdown:
    case FieldTypes.MultiSelect:
    case FieldTypes.Radio: return List;
    default: return Database;
  }
}

// 2️⃣ Lấy màu
export function getFieldTypeColor(fieldType: string): string {
  const lower = fieldType.toLowerCase();
  switch (lower) {
    case FieldTypes.Number.toLowerCase():
    case FieldTypes.Decimal.toLowerCase():
    case "int":
    case "integer":
    case "float":
      return "#1890ff";
    case FieldTypes.DatePicker.toLowerCase():
    case FieldTypes.DateTimePicker.toLowerCase():
    case "date":
    case "datetime":
    case "timestamp":
      return "#52c41a";
    case FieldTypes.TimePicker.toLowerCase():
    case "time": 
      return "#13c2c2";
    case FieldTypes.Text.toLowerCase():
    case FieldTypes.Email.toLowerCase():
    case FieldTypes.Phone.toLowerCase():
    case "string":
    case "varchar":
    case "char":
      return "#722ed1";
    case FieldTypes.Textarea.toLowerCase():
    case FieldTypes.RichEditor.toLowerCase():
    case "text":
    case "textarea":
    case "longtext":
      return "#2f54eb";
    case FieldTypes.Checkbox.toLowerCase():
    case FieldTypes.Switch.toLowerCase():
    case "boolean":
    case "bit":
      return "#fa8c16";
    case FieldTypes.Radio.toLowerCase():
    case FieldTypes.Dropdown.toLowerCase():
    case FieldTypes.MultiSelect.toLowerCase():
      return "#a0d911";
    case FieldTypes.Guid.toLowerCase():
      return "#8c8c8c";
    default:
      return "#8c8c8c";
  }
}

// 3️⃣ Lấy nhãn hiển thị
export function getFieldTypeLabel(fieldType: string): string {
  const labels: Record<string, string> = {
    [FieldTypes.Guid]: "Định danh",
    [FieldTypes.Text]: "Chuỗi ngắn",
    [FieldTypes.Textarea]: "Văn bản dài",
    [FieldTypes.RichEditor]: "Văn bản định dạng",
    [FieldTypes.Password]: "Mật khẩu",
    [FieldTypes.Email]: "Email",
    [FieldTypes.Phone]: "Điện thoại",
    [FieldTypes.Number]: "Số nguyên",
    [FieldTypes.Decimal]: "Số thập phân",
    [FieldTypes.DatePicker]: "Ngày",
    [FieldTypes.TimePicker]: "Giờ",
    [FieldTypes.DateTimePicker]: "Ngày giờ",
    [FieldTypes.Checkbox]: "Hộp kiểm",
    [FieldTypes.Radio]: "Nút chọn",
    [FieldTypes.Switch]: "Công tắc",
    [FieldTypes.Dropdown]: "Danh sách chọn",
    [FieldTypes.MultiSelect]: "Chọn nhiều"
  };
  return labels[fieldType] || fieldType;
}
const markGroupAggregates = (arr: AggregateOption[]): AggregateOption[] =>
  arr.map(opt => {
    const isAggregateFunc = opt.typeQuery === 'select';
    return {
      ...opt,
      isGroup: isAggregateFunc ? true : false
    };
  });
// 4️⃣ Predefined aggregate options
const NUMERIC_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'sum', label: 'Tổng', description: 'Tính tổng tất cả các giá trị', icon: '➕', category: 'numeric', typeQuery: 'select' },
  { value: 'avg', label: 'Trung bình', description: 'Tính giá trị trung bình', icon: '📊', category: 'numeric', typeQuery: 'select' },
  { value: 'min', label: 'Giá trị nhỏ nhất', description: 'Tìm giá trị nhỏ nhất', icon: '⬇️', category: 'numeric', typeQuery: 'select' },
  { value: 'max', label: 'Giá trị lớn nhất', description: 'Tìm giá trị lớn nhất', icon: '⬆️', category: 'numeric', typeQuery: 'select' },
  { value: 'count', label: 'Đếm', description: 'Đếm số lượng bản ghi', icon: '🔢', category: 'numeric', typeQuery: 'select' },
  { value: 'median', label: 'Trung vị', description: 'Tính giá trị trung vị', icon: '📈', category: 'statistical', typeQuery: 'select' },
  { value: 'stddev', label: 'Độ lệch chuẩn', category: 'statistical', typeQuery: 'select' },



  { value: '>', label: 'Lớn hơn (>)', typeQuery: 'where', category: 'numeric' },
  { value: '<', label: 'Nhỏ hơn (<)', typeQuery: 'where', category: 'numeric' },
  { value: '>=', label: 'Lớn hơn hoặc bằng (>=)', typeQuery: 'where', category: 'numeric' },
  { value: '<=', label: 'Nhỏ hơn hoặc bằng (<=)', typeQuery: 'where', category: 'numeric' },
  { value: '=', label: 'Bằng (=)', typeQuery: 'where', category: 'numeric' },
  { value: '!=', label: 'Khác (!=)', typeQuery: 'where', category: 'numeric' },
  { value: 'between', label: 'Trong khoảng', typeQuery: 'where', category: 'numeric' },
]);

const TEXT_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'count', label: 'Đếm', description: 'Đếm số lượng bản ghi', icon: '🔢', category: 'text', typeQuery: 'select' },
  { value: '', label: 'Đếm theo loại', description: 'Đếm số lượng giá trị khác nhau', icon: '🔍', category: 'text', typeQuery: 'select' },
  { value: 'distinct_count', label: 'Đếm giá trị duy nhất', description: 'Đếm số lượng giá trị khác nhau', icon: '🔍', category: 'text', typeQuery: 'select' },
  { value: 'min_length', label: 'Độ dài nhỏ nhất', description: 'Tìm chuỗi có độ dài nhỏ nhất', icon: '📏', category: 'text', typeQuery: 'orderBy' },
  { value: 'max_length', label: 'Độ dài lớn nhất', description: 'Tìm chuỗi có độ dài lớn nhất', icon: '📐', category: 'text', typeQuery: 'orderBy' },
  { value: 'top 1', label: 'Giá trị đầu tiên', description: 'Lấy giá trị đầu tiên (theo thứ tự)', icon: '⏮️', category: 'text', typeQuery: 'orderBy' },
  { value: 'last', label: 'Giá trị cuối cùng', description: 'Lấy giá trị cuối cùng (theo thứ tự)', icon: '⏭️', category: 'text', typeQuery: 'orderBy' },
  { value: '=', label: 'Bằng (=)', typeQuery: 'where', category: 'text' },
  { value: '!=', label: 'Khác (!=)', typeQuery: 'where', category: 'text' },
  { value: 'like', label: 'Chứa', typeQuery: 'where', category: 'text' },
  { value: 'starts_with', label: 'Bắt đầu với', typeQuery: 'where', category: 'text' },
  { value: 'ends_with', label: 'Kết thúc với', typeQuery: 'where', category: 'text' },
]);
const DATE_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'count', label: 'Đếm', description: 'Đếm số lượng bản ghi', icon: '🔢', category: 'date', typeQuery: 'select' },

  { value: 'min', label: 'Ngày sớm nhất', description: 'Tìm ngày sớm nhất', icon: '📅', category: 'date', typeQuery: 'orderBy' },
  { value: 'max', label: 'Ngày muộn nhất', description: 'Tìm ngày muộn nhất', icon: '📆', category: 'date', typeQuery: 'orderBy' },

  { value: 'range', label: 'Khoảng thời gian', description: 'Tính khoảng thời gian từ min đến max', icon: '⏰', category: 'date', typeQuery: 'select' },

  { value: 'group_by_year', label: 'Nhóm theo năm', description: 'Nhóm dữ liệu theo năm', icon: '📅', category: 'date', typeQuery: 'groupBy' },
  { value: 'group_by_month', label: 'Nhóm theo tháng', description: 'Nhóm dữ liệu theo tháng', icon: '📅', category: 'date', typeQuery: 'groupBy' },
 
  { value: '=', label: 'Bằng (=)', typeQuery: 'where', category: 'date' },
  { value: 'between', label: 'Trong khoảng', typeQuery: 'where', category: 'date' },
  { value: '>', label: 'Sau ngày', typeQuery: 'where', category: 'date' },
  { value: '<', label: 'Trước ngày', typeQuery: 'where', category: 'date' },
]);

const BOOLEAN_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'count', label: 'Đếm tổng', description: 'Đếm tất cả bản ghi', icon: '🔢', category: 'logical', typeQuery: 'select' },
  { value: 'count_true', label: 'Đếm True', description: 'Đếm số lượng giá trị True', icon: '✅', category: 'logical', typeQuery: 'select' },
  { value: 'count_false', label: 'Đếm False', description: 'Đếm số lượng giá trị False', icon: '❌', category: 'logical', typeQuery: 'select' },
  { value: 'percentage_true', label: 'Tỉ lệ True (%)', description: 'Tính tỉ lệ phần trăm giá trị True', icon: '📊', category: 'logical', typeQuery: 'select' },
  { value: '=', label: 'Bằng (=)', typeQuery: 'where', category: 'logical' },
  { value: '!=', label: 'Khác (!=)', typeQuery: 'where', category: 'logical' },
]);

const GUID_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'count', label: 'Đếm', description: 'Đếm số lượng ID', icon: '🔢', category: 'text', typeQuery: 'select' },
  { value: 'distinct_count', label: 'Đếm ID duy nhất', description: 'Đếm số lượng ID khác nhau', icon: '🆔', category: 'text', typeQuery: 'select' },
  { value: '=', label: 'Bằng (=)', typeQuery: 'where', category: 'text' },
  { value: '!=', label: 'Khác (!=)', typeQuery: 'where', category: 'text' },
]);

 const DEFAULT_AGGREGATES: AggregateOption[] = markGroupAggregates([
  { value: 'count', label: 'Đếm', description: 'Đếm số lượng bản ghi', icon: '🔢', category: 'text', typeQuery: 'select' },
]);
// 5️⃣ Lấy aggregate options theo field type - Cải thiện
export function getAggregateOptions(fieldType: string): AggregateOption[] {
  switch (fieldType) {
    // Numeric types
    case FieldTypes.Number:
    case FieldTypes.Decimal:
      return NUMERIC_AGGREGATES;
    
    // GUID type
    case FieldTypes.Guid:
      return GUID_AGGREGATES;
    
    // Text types
    case FieldTypes.Text:
    case FieldTypes.Textarea:
    case FieldTypes.RichEditor:
    case FieldTypes.Email:
    case FieldTypes.Phone:
    case FieldTypes.Password:
    case "string":
      return TEXT_AGGREGATES;
    
    // Date/Time types
    case FieldTypes.DatePicker:
    case FieldTypes.DateTimePicker:
    case FieldTypes.TimePicker:
    case "date":
    case "datetime":
    case "time":
      return DATE_AGGREGATES;
    
    // Boolean types
    case FieldTypes.Checkbox:
    case FieldTypes.Switch:
    case "boolean":
      return BOOLEAN_AGGREGATES;
    
    // Selection types - limited options
    case FieldTypes.Radio:
    case FieldTypes.Dropdown:
    case FieldTypes.MultiSelect:
      return [
        ...TEXT_AGGREGATES.filter(opt => 
          ['count', 'distinct_count', 'first', 'last'].includes(opt.value)
        )
      ];
    
    default:
      return DEFAULT_AGGREGATES;
  }
}

// 6️⃣ Lấy aggregate options nhóm theo category
export function getAggregateOptionsByCategory(fieldType: string): AggregateCategory[] {
  const options = getAggregateOptions(fieldType);
  const grouped = options.reduce((acc, option) => {
    const category = option.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(option);
    return acc;
  }, {} as Record<string, AggregateOption[]>);

  const categoryLabels: Record<string, string> = {
    numeric: 'Phép tính số học',
    statistical: 'Thống kê',
    text: 'Xử lý văn bản',
    date: 'Xử lý thời gian',
    logical: 'Logic',
    other: 'Khác'
  };

  return Object.entries(grouped).map(([category, options]) => ({
    category,
    label: categoryLabels[category] || category,
    options
  }));
}


export function getAggregatesByType(category:  AggregateOption[], type: string) {
  const allAggregates = category ? category : [
    ...NUMERIC_AGGREGATES,
    ...TEXT_AGGREGATES,
    ...DATE_AGGREGATES,
    ...BOOLEAN_AGGREGATES,
    ...GUID_AGGREGATES,
    ...DEFAULT_AGGREGATES,
  ];
  return allAggregates.find(a => a.value === type)?.typeQuery;
}


// 7️⃣ Kiểm tra field type có phải là numeric không
export function isNumericField(fieldType: string): boolean {
  const numericTypes = [
    FieldTypes.Number,
    FieldTypes.Decimal,
    'int',
    'integer',
    'float',
    'double',
    'numeric'
  ];
  return numericTypes.some(type => 
    fieldType.toLowerCase() === type.toLowerCase()
  );
}

// 8️⃣ Kiểm tra field type có phải là date không
export function isDateField(fieldType: string): boolean {
  const dateTypes = [
    FieldTypes.DatePicker,
    FieldTypes.DateTimePicker,
    FieldTypes.TimePicker,
    'date',
    'datetime',
    'timestamp',
    'time'
  ];
  return dateTypes.some(type => 
    fieldType.toLowerCase() === type.toLowerCase()
  );
}

// 9️⃣ Kiểm tra field type có phải là text không
export function isTextField(fieldType: string): boolean {
  const textTypes = [
    FieldTypes.Text,
    FieldTypes.Textarea,
    FieldTypes.RichEditor,
    FieldTypes.Email,
    FieldTypes.Phone,
    FieldTypes.Password,
    'string',
    'varchar',
    'char',
    'text'
  ];
  return textTypes.some(type => 
    fieldType.toLowerCase() === type.toLowerCase()
  );
}

// 🔟 Kiểm tra field type có phải là boolean không
export function isBooleanField(fieldType: string): boolean {
  const booleanTypes = [
    FieldTypes.Checkbox,
    FieldTypes.Switch,
    'boolean',
    'bit',
    'bool'
  ];
  return booleanTypes.some(type => 
    fieldType.toLowerCase() === type.toLowerCase()
  );
}

// 1️⃣1️⃣ Lấy field category
export function getFieldCategory(fieldType: string): 'numeric' | 'text' | 'date' | 'boolean' | 'selection' | 'other' {
  if (isNumericField(fieldType)) return 'numeric';
  if (isDateField(fieldType)) return 'date';
  if (isTextField(fieldType)) return 'text';
  if (isBooleanField(fieldType)) return 'boolean';
  
  const selectionTypes = [FieldTypes.Radio, FieldTypes.Dropdown, FieldTypes.MultiSelect];
  if (selectionTypes.includes(fieldType as any)) return 'selection';
  
  return 'other';
}

// 1️⃣2️⃣ Kiểm tra aggregate option có hợp lệ không
export function isValidAggregateOption(fieldType: string, aggregateValue: string): boolean {
  const availableOptions = getAggregateOptions(fieldType);
  return availableOptions.some(option => option.value === aggregateValue);
}

// 1️⃣3️⃣ Lấy aggregate option theo value
export function getAggregateOption(fieldType: string, value: string): AggregateOption | undefined {
  const options = getAggregateOptions(fieldType);
  return options.find(option => option.value === value);
}

// 1️⃣4️⃣ Lấy recommended aggregate options
export function getRecommendedAggregateOptions(fieldType: string): AggregateOption[] {
  const allOptions = getAggregateOptions(fieldType);
  
  // Define recommended options based on field category
  const category = getFieldCategory(fieldType);
  const recommendedValues: Record<string, string[]> = {
    numeric: ['sum', 'avg', 'count', 'max', 'min'],
    text: ['count', 'distinct_count'],
    date: ['count', 'min', 'max', 'group_by_month'],
    boolean: ['count_true', 'count_false', 'percentage_true'],
    selection: ['count', 'distinct_count'],
    other: ['count']
  };
  
  const recommended = recommendedValues[category] || ['count'];
  
  return allOptions.filter(option => recommended.includes(option.value));
}

// 1️⃣5️⃣ Format aggregate result cho hiển thị
export function formatAggregateResult(value: any, aggregateType: string, fieldType: string): string {
  if (value === null || value === undefined) return 'N/A';
  
  switch (aggregateType) {
    case 'sum':
    case 'avg':
    case 'min':
    case 'max':
      if (isNumericField(fieldType)) {
        if (fieldType === FieldTypes.Decimal) {
          return Number(value).toLocaleString('vi-VN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          });
        }
        return Number(value).toLocaleString('vi-VN');
      }
      return String(value);
    
    case 'count':
    case 'distinct_count':
    case 'count_true':
    case 'count_false':
      return Number(value).toLocaleString('vi-VN');
    
    case 'percentage_true':
    case 'percentage_false':
      return `${Number(value).toFixed(1)}%`;
    
    case 'min_length':
    case 'max_length':
      return `${value} ký tự`;
      
    default:
      return String(value);
  }
}