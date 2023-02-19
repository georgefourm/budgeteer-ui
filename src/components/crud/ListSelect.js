import { Form, Select } from "antd";

export default function ListSelect({ items, name, label, required = true }) {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: "Select " + label,
        },
      ]}
    >
      <Select
        placeholder={label}
        allowClear={true}
        showSearch
        filterOption={(value, option) =>
          option.children.toLowerCase().includes(value.toLowerCase())
        }
      >
        {items.map((i) => (
          <Select.Option key={i.id} value={i.id}>
            {i.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
