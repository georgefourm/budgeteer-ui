import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, put, post, del } from "../../../utils/network";
import CategoryModal from "./CategoryModal";

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
