import React, { useState, useEffect } from "react";
import { get, put, post, del } from "utils/network";
import CrudTable from "components/crud/CrudTable";
import { Form, Input, Select, DatePicker } from "antd";
import moment from "moment";

export default function IncomeList() {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    get("income-types").then((response) => {
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
      title: "Type",
      dataIndex: ["type", "name"],
      key: "id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "id",
    },
    {
      title: "Received At",
      dataIndex: "receivedAt",
      key: "id",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
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
        typeId: editing.type ? editing.type.id : null,
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
          label="Type"
          name="typeId"
          rules={[
            {
              required: true,
              message: "The income amount",
            },
          ]}
        >
          <Select
            placeholder="Income type"
            allowClear={true}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
          >
            {types.map((type) => (
              <Select.Option key={type.id} value={type.id}>
                {type.name}
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
        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
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
