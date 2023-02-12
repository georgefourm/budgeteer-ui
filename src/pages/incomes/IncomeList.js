import React, { useState, useEffect } from "react";
import { get, put, post, del } from "utils/network";
import CrudTable from "components/crud/CrudTable";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

export default function IncomeList() {
  const [categories, setTypes] = useState([]);
  useEffect(() => {
    get("categories").then((response) => {
      setTypes(response);
    });
  }, []);
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    get("incomes").then((response) => {
      setIncomes(response);
    });
  }, []);

  const columns = [
    {
      title: "Received At",
      dataIndex: "receivedAt",
      key: "id",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Category",
      dataIndex: ["cateory", "name"],
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "id",
    },
  ];

  const onCreate = async (values) => {
    const created = await post("incomes", values);
    setIncomes([created, ...incomes]);
  };

  const onUpdate = async (id, values) => {
    const updated = await put(`incomes/${id}`, values);
    setIncomes(incomes.map((i) => (i.id === id ? updated : i)));
  };

  const onDelete = async (id) => {
    await del(`incomes/${id}`);
    setIncomes(incomes.filter((i) => i.id !== id));
  };

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        categoryId: editing.type ? editing.category.id : null,
        ...editing,
        receivedAt: editing.receivedAt ? moment(editing.receivedAt) : null,
      });
    } else {
      form.setFieldsValue({
        receivedAt: moment(),
      });
    }
    return (
      <React.Fragment>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Category"
            allowClear={true}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
          >
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "The income amount",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Received At"
          name="receivedAt"
          rules={[
            {
              required: true,
              message: "A date is required",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      </React.Fragment>
    );
  };
  return (
    <CrudTable
      data={incomes}
      {...{
        columns,
        onCreate,
        onUpdate,
        onDelete,
        renderForm,
      }}
    />
  );
}
