import CrudTable from "components/crud/CrudTable";
import React, { useState, useEffect } from "react";
import { Form, DatePicker, Input, Tag } from "antd";
import moment from "moment";
import CategorySelect from "components/crud/CategorySelect";
import { get } from "utils/network";
import ColorTag from "components/text/ColorTag";

export default function ImportTable({ expenses, setExpenses }) {
  const onUpdate = async (id, values) => {
    setExpenses(expenses.map((e) => (e.id === id ? values : e)));
  };

  const onCreate = async (values) => {
    setExpenses([...expenses, values]);
  };

  const onDelete = async (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get("categories").then((response) => {
      setCategories(response);
    });
  }, []);
  const CategoryTag = ColorTag(categories);
  const columns = [
    {
      title: "Date",
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
      dataIndex: "categoryId",
      key: "id",
      render: (id) => id && <CategoryTag id={id} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
  ];

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        boughtAt: editing.boughtAt ? moment(editing.boughtAt) : null,
      });
    } else {
      form.setFieldsValue({
        boughtAt: null,
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
        <CategorySelect categories={categories} />
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
