import React from 'react';
import { Button, Card, Col, Form, Input, Select, DatePicker, Row } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import Flex from '@/components/shared-components/Flex';
import { downloadFileFromBase64 } from '@/utils/fileDownload';
import { useForm } from 'antd/es/form/Form';

import * as extensions from '@/utils/extensions';

import { ThemeConfigSearchType } from '@/types/themeConfig/themeConfig';
import {themeConfigService} from '@/services/themeConfig/themeConfigService';

interface SearchProps {
  onFinish: ((values: ThemeConfigSearchType) => void) | undefined;
  pageIndex: number;
  pageSize: number;
}
const Search: React.FC<SearchProps> = ({ onFinish, pageIndex, pageSize }) => {
  const [form] = useForm<ThemeConfigSearchType>();

  return (
    <>
      <Card className="customCardShadow mb-3">
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="name"
                label="Tên chủ đề"
                name="name"
              >
                <Input placeholder="Tên chủ đề" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorPrimary"
                label="Màu chủ đạo"
                name="colorPrimary"
              >
                <Input placeholder="Màu chủ đạo" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorPrimaryHover"
                label="Màu hover"
                name="colorPrimaryHover"
              >
                <Input placeholder="Màu hover" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorPrimaryHover"
                label="Màu active"
                name="colorPrimaryActive"
              >
                <Input placeholder="Màu hover" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="fontFamily"
                label="Font chữ"
                name="fontFamily"
              >
                <Input placeholder="Font chữ" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="borderRadius"
                label="Bo góc"
                name="borderRadius"
              >
                <Input placeholder="Bo góc" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorBorder"
                label="Màu border"
                name="colorBorder"
              >
                <Input placeholder="Màu border" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorTextPlaceholder"
                label="Màu viền"
                name="colorTextPlaceholder"
              >
                <Input placeholder="Màu viền" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="colorText"
                label="Màu chữ"
                name="colorText"
              >
                <Input placeholder="Màu chữ" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={8} md={12} xs={24}>
              <Form.Item<ThemeConfigSearchType>
                key="isActive"
                label="Hoạt động"
                name="isActive"
              >
                <Input placeholder="Hoạt động" />
              </Form.Item>
            </Col>
          </Row>

          <Flex
            alignItems="center"
            justifyContent="center"
            className="btn-group"
          >
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              size="small"
            >
              Tìm kiếm
            </Button>
   
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default Search;
