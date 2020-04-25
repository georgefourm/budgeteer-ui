import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

export default function CategoryModal({
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
      parent: formValues.parent ? formValues.parent.id : null,
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
      title={formValues == null ? "Add new Category" : "Edit Category"}
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
        name="category"
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
              message: "The Category name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Parent" name="parent">
          <Select placeholder="Parent category" allowClear={true}>
            {categories
              .filter((cat) => !cat.parent)
              .map((category) => (
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
