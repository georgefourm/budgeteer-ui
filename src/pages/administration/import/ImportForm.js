import {
  Button,
  Card,
  Form,
  Input,
  Upload,
  Select,
  Space,
  message,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { get } from "utils/network";

export default function ImportForm({ onImport, onSubmit }) {
  const [members, setMembers] = useState([]);
  const [parsed, setParsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    onImport(values)
      .then(() => {
        setParsed(true);
        messageApi.success({ content: "File parsed" });
      })
      .catch((err) => {
        setParsed(false);
        messageApi.error({ content: "Failed to parse file" });
      });
  };

  const onSubmitCallback = () => {
    onSubmit()
      .then(() => {
        messageApi.success({ content: "Expenses imported" });
      })
      .catch((err) => {
        messageApi.error({ content: "Failed to import expenses" });
      });
  };

  useEffect(() => {
    get("members").then((response) => {
      setMembers(response);
    });
  }, []);

  return (
    <Card title="Import Configuration">
      {contextHolder}
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          memberId: 1,
          timestampField: "Date",
          valueField: "Amount",
          descriptionField: "Details",
          timestampFormat: "yyyyMMdd",
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Member"
          name="memberId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Member"
            allowClear={false}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
          >
            {members.map((v) => (
              <Select.Option key={v.id} value={v.id}>
                {v.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Timestamp Field"
          name="timestampField"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Value Field"
          name="valueField"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description Field"
          name="descriptionField"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Timestamp Format"
          name="timestampFormat"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expensesAsNegative"
          valuePropName="checked"
          wrapperCol={{
            span: 16,
          }}
        >
          <Checkbox>Expenses As Negative</Checkbox>
        </Form.Item>
        <Form.Item label="File" name="files" required>
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit">Import</Button>
            <Button
              type="primary"
              htmlType="button"
              disabled={!parsed}
              onClick={onSubmitCallback}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}
