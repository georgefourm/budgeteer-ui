import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Input, Select, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, put, post, del } from "../../utils/network";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get("categories").then((response) => {
      setCategories(response);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Parent",
      dataIndex: ["parent", "name"],
      key: "id",
    },
    {
      title: "Actions",
      key: "id",
      render: (text, record) => (
        <Space>
          <Button onClick={() => onEdit(record.id)}>
            <EditOutlined />
            Edit
          </Button>
          <Button onClick={() => onDelete(record.id)}>
            <DeleteOutlined />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const onSave = async (values) => {
    if (editing) {
      setEditing(false);
      const response = await put("categories/" + editing.id, {
        name: values.name,
        parentId: values.parent || null,
      });
      setCategories(
        categories.map((cat) => {
          if (cat.id === editing.id) {
            return response;
          } else {
            return cat;
          }
        })
      );
    } else {
      const response = await post("categories", {
        name: values.name,
        parentId: values.parent || null,
      });
      setCategories([response, ...categories]);
    }
    setModalVisible(false);
  };

  const onDelete = async (id) => {
    await del(`categories/${id}`);
    setCategories(categories.filter((cat) => cat.id !== id));
  };
  const onEdit = (id) => {
    setEditing(categories.find((cat) => cat.id === id));
    setModalVisible(true);
  };
  const onCancel = () => {
    setEditing(false);
    setModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add New
      </Button>
      <CategoryModal
        visible={modalVisible}
        categories={categories}
        onSave={onSave}
        onCancel={onCancel}
        formValues={editing}
      />
      <Table dataSource={categories} columns={columns} rowKey="id" />
    </div>
  );
}

function CategoryModal({
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
