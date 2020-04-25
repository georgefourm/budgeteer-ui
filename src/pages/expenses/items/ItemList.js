import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, put, post, del } from "../../../utils/network";
import ItemModal from "./ItemModal";

export default function ItemList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get("categories").then((response) => {
      setCategories(response);
    });
  }, []);
  const [items, setItems] = useState([]);
  useEffect(() => {
    get("items").then((response) => {
      setItems(response);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Default Cost",
      dataIndex: ["defaultCost"],
      key: "id",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
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
      const response = await put("items/" + editing.id, {
        name: values.name,
        defaultCost: values.defaultCost || null,
        categoryId: values.category || null,
      });
      setItems(
        items.map((item) => {
          if (item.id === editing.id) {
            return response;
          } else {
            return item;
          }
        })
      );
    } else {
      const response = await post("items", {
        name: values.name,
        defaultCost: values.defaultCost || null,
        categoryId: values.category || null,
      });
      setItems([response, ...items]);
    }
    setModalVisible(false);
  };

  const onDelete = async (id) => {
    await del(`items/${id}`);
    setItems(items.filter((item) => item.id !== id));
  };
  const onEdit = (id) => {
    setEditing(items.find((item) => item.id === id));
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
      <ItemModal
        visible={modalVisible}
        categories={categories}
        onSave={onSave}
        onCancel={onCancel}
        formValues={editing}
      />
      <Table dataSource={items} columns={columns} rowKey="id" />
    </div>
  );
}
