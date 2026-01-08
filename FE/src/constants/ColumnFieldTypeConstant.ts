import { text } from "stream/consumers";
import { createConstant } from "./Constant";
const ColumnFieldTypeConstant = createConstant(
  {
    text: "Text",
    badge: "Badge",
    button: "Button",
    link: "Link",
  },
  {
    text: { displayName: "Text" },
    badge: { displayName: "Badge" },
    button: { displayName: "Button" },
    link: { displayName: "Link" },
  }
);

export default ColumnFieldTypeConstant;
