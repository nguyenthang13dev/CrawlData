import { createConstant } from "./Constant";
const TableConstant = createConstant(
  {
    QL_LanhDao: "QL_LanhDao",
    Department: "Department",
  },
  {
    QL_LanhDao: { displayName: "Quản lý lãnh đạo" },
    Department: { displayName: "Phòng ban" },
  }
);
export default TableConstant;
