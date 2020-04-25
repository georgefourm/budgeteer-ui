import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

export default function ExpenseModal({
  visible,
  items,
  onSave,
  onCancel,
  formValues = null,
}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  if (formValues != null) {
    form.setFieldsValue({
      item: formValues.item ? formValues.item.id : null,
      cost: formValues.cost,
      amount: formValues.amount,
      boughtAt: formValues.boughtAt,
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

  const initialValues = {
    boughtAt: moment(),
    amount: 1,
  };

  return (
    <Modal
      title={formValues == null ? "Add new Expense" : "Edit Expense"}
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
        initialValues={initialValues}
      >
        <Form.Item
          label="Item"
          name="item"
          rules={[
            {
              required: true,
              message: "An item is required",
            },
          ]}
        >
          <Select
            placeholder="Expense Item"
            allowClear={true}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
            onChange={(itemId) => {
              const item = items.find((i) => i.id === itemId);
              form.setFieldsValue({
                cost: item.defaultCost,
              });
            }}
          >
            {items.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Cost" name="cost">
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Bought At" name="boughtAt">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
}
