import { Button, Card, Col, Form, Input, Row, TreeSelect } from "antd";
import classes from "./page.module.css";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Flex from "@/components/shared-components/Flex";
import { useEffect } from "react";
import { userService } from "@/services/user/user.service";
import { downloadFileFromBase64 } from "@/utils/fileDownload";
import { searchRole } from "@/types/role/role";
import { useForm } from "antd/es/form/Form";
import { roleService } from "@/services/role/role.service";
import { message } from "antd";
import { rules } from "@/validators/validationFormRules";
import { DropdownOption } from "@/types/general";
import { removeAccents } from "@/libs/CommonFunction";

interface SearchProps {
  onFinish: ((values: searchRole) => void) | undefined;
  pageIndex: number;
  pageSize: number;
  isAdmin: boolean;
  dropdownDepartment: DropdownOption[];
}
const Search: React.FC<SearchProps> = ({
  onFinish,
  pageIndex,
  pageSize,
  isAdmin,
  dropdownDepartment,
}) => {
  const [form] = useForm<searchRole>();

  const handleExport = async () => {
    const formValues = form.getFieldsValue();
    const exportData = {
      ...formValues,
      pageIndex,
      pageSize,
    };

    const response = await roleService.exportExcel(exportData);
    if (response.status) {
      downloadFileFromBase64(response.data, "Danh sách nhóm quyền.xlsx");
    } else {
      message.error(response.message);
    }
  };

  return (
    <>
      <Card className={`${classes.customCardShadow} ${classes.mgButton10}`}>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24} justify={"center"}>
            <Col span={8}>
              <Form.Item<searchRole>
                label="Mã nhóm quyền"
                name="code"
                rules={[rules.longContent]}
              >
                <Input placeholder="Mã nhóm quyền" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<searchRole>
                label="Tên nhóm quyền"
                name="name"
                rules={[rules.longContent]}
              >
                <Input placeholder="Tên nhóm quyền" />
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
