import React, { useState, useEffect } from "react";
import { get, put, post, del } from "../../../utils/network";
import moment from "moment";
import CrudTable from "../../../components/crud/CrudTable";
import { Form, Select, DatePicker, Input } from "antd";

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
      title: "Bought At",
      dataIndex: "boughtAt",
      key: "id",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
  ];
  const onUpdate = async (id, values) => {
    const updated = await put(`expenses/${id}`, values);
    setExpenses(expenses.map((e) => (e.id === id ? updated : e)));
  };

  const onCreate = async (values) => {
    const created = await post("expenses", values);
    setExpenses([created, ...expenses]);
  };

  const onDelete = async (id) => {
    await del(`expenses/${id}`);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        boughtAt: editing.boughtAt ? moment(editing.boughtAt) : null,
      });
    } else {
      form.setFieldsValue({
        boughtAt: moment(),
        amount: 1,
      });
    }
    return (
      <React.Fragment>
        <Form.Item label="Bought At" name="boughtAt">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Amount" name="amount">
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
      </React.Fragment>
    );
  };

  return (
    <CrudTable
      data={expenses}
      {...{
        columns,
        renderForm,
        onCreate,
        onUpdate,
        onDelete,
      }}
    />
  );
}
