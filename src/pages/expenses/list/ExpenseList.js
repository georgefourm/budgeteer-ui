import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, put, post, del } from "../../../utils/network";
import ExpenseModal from "./ExpenseModal";
import moment from "moment";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    get("expenses").then((response) => {
      setExpenses(response);
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
      title: "Item",
      dataIndex: ["item", "name"],
      key: "id",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "id",
    },
    {
      title: "Bought At",
      dataIndex: "boughtAt",
      key: "id",
      render: (text, record) => (
        <span>{moment(text).format("DD/MM/YYYY")}</span>
      ),
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
      const response = await put("expenses/" + editing.id, {
        itemId: values.item,
        ...values,
      });
      setExpenses(
        expenses.map((expense) => {
          if (expense.id === editing.id) {
            return response;
          } else {
            return expense;
          }
        })
      );
    } else {
      const response = await post("expenses", {
        itemId: values.item,
        ...values,
      });
      setExpenses([response, ...expenses]);
    }
    setModalVisible(false);
  };

  const onDelete = async (id) => {
    await del(`expenses/${id}`);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  const onEdit = (id) => {
    setEditing(expenses.find((exp) => exp.id === id));
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
      <ExpenseModal
        visible={modalVisible}
        items={items}
        onSave={onSave}
        onCancel={onCancel}
        formValues={editing}
      />
      <Table dataSource={expenses} columns={columns} rowKey="id" />
    </div>
  );
}
