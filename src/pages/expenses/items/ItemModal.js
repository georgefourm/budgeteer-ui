import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

export default function ItemModal({
  visible,
  categories,
  onSave,
  onCancel,
  formValues = null,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (formValues != null) {
    form.setFieldsValue({
      name: formValues.name,
      defaultCost: formValues.defaultCost,
      category: formValues.category ? formValues.category.id : null,
    });
  }

  const submit = () => {
    setLoading(true);
    form.submit();
  };
  const onFinish = (values) => {
    onSave(values).then(() => {
      setLoading(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={formValues == null ? "Add new Item" : "Edit Item"}
      visible={visible}
      onOk={submit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      confirmLoading={loading}
    >
      <Form
        form={form}
        name="item"
        layout="vertical"
        labelAlign="right"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "The Item name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Default Cost"
          name="defaultCost"
          rules={[{ type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            placeholder="Item category"
            allowClear={true}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
          >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
