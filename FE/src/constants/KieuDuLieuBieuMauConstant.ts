import { createConstant } from "./Constant";
const KieuDuLieuBieuMauConstant = createConstant(
  {
    text: "text",
    number: "number",
    combobox: "combobox",
    checkbox: "checkbox",
    date: "date",
    editor: "editor",
    textarea: "textarea",
    
  },
  {
    text: { displayName: "Chữ" },
    number: { displayName: "Số" },
    combobox: { displayName: "Combobox" },
    checkbox: { displayName: "Checkbox" },
    date: { displayName: "Ngày" },
    editor: { displayName: "Editor" },
    textarea: { displayName: "Textarea" },
   
  }
);
export default KieuDuLieuBieuMauConstant;
