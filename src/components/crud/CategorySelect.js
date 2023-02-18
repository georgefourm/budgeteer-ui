import { Form, Select } from "antd";

export default function CategorySelect({ categories }) {
  return (
    <Form.Item
      label="Category"
      name="categoryId"
      rules={[
        {
          required: true,
          message: "Select a category",
        },
      ]}
    >
      <Select
        placeholder="Category"
        allowClear={true}
        showSearch
        filterOption={(value, option) =>
          option.children.toLowerCase().includes(value.toLowerCase())
        }
      >
        {categories.map((cat) => (
          <Select.Option key={cat.id} value={cat.id}>
            {cat.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
