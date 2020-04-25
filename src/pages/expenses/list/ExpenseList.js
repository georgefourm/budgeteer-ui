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
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
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
        itemId: editing.item.id,
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
        <Form.Item
          label="Item"
          name="itemId"
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
