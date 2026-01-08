import { Button, Card, Col, Form, Input, Row, TreeSelect } from "antd";
import classes from "./page.module.css";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { downloadFileFromBase64 } from "@/utils/fileDownload";
import { searchRole } from "@/types/role/role";
import { groupUserService } from "@/services/groupUser/groupUser.service";
import { rules } from "@/validators/validationFormRules";
import { DropdownOption } from "@/types/general";
import { removeAccents } from "@/libs/CommonFunction";

interface SearchProps {
  onFinish: ((values: searchRole) => void) | undefined;
  isAdmin: boolean;
  dropdownDepartment: DropdownOption[];
}
const Search: React.FC<SearchProps> = ({
  onFinish,
  isAdmin,
  dropdownDepartment,
}) => {
  const handleExport = async () => {
    const excelBase64 = await groupUserService.exportExcel();
    downloadFileFromBase64(
      excelBase64.data,
      "Danh sách nhóm người sử dụng.xlsx"
    );
  };

  return (
    <>
      <Card className={`${classes.customCardShadow} ${classes.mgButton10}`}>
        <Form
          layout="vertical"
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24} justify={"center"}>
            <Col span={8}>
              <Form.Item<searchRole>
                label="Mã nhóm người sử dụng"
                name="code"
                rules={[rules.longContent]}
              >
                <Input placeholder="Mã nhóm người sử dụng" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<searchRole>
                label="Tên nhóm người sử dụng"
                name="name"
                rules={[rules.longContent]}
              >
                <Input placeholder="Tên nhóm người sử dụng" />
              </Form.Item>
            </Col>
            {isAdmin && (
              <Col span={8}>
                <Form.Item<searchRole> label="Phòng ban" name="departmentId">
                  <TreeSelect
                    showSearch
                    style={{ width: "100%" }}
                    styles={{
                      popup: { root: { maxHeight: 400, overflow: "auto" } },
                    }}
                    placeholder="Chọn phòng ban"
                    allowClear
                    treeDefaultExpandAll
                    treeData={dropdownDepartment}
                    filterTreeNode={(input, treeNode) => {
                      const title = treeNode.title as string;
                      const inputText = removeAccents(input.toLowerCase());
                      const nodeText = removeAccents(title.toLowerCase());
                      return nodeText.includes(inputText);
                    }}
                  />
                </Form.Item>
              </Col>
            )}
          </Row>

          <Flex alignItems="center" justifyContent="center">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              className={classes.mgright5}
              size="small"
            >
              Tìm kiếm
            </Button>
            <Button
              onClick={handleExport}
              type="primary"
              icon={<DownloadOutlined />}
              className={`${classes.mgright5} ${classes.colorKetXuat}`}
              size="small"
            >
              Kết xuất
            </Button>
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default Search;
