import React from "react";
import { Table, DatePicker } from "antd";

export default function ExpenseList() {
  const dataSource = [
    {
      id: 1,
      item: "Snacks",
      amount: 1,
      cost: 1.5,
    },
    {
      id: 2,
      item: "Toothpaste",
      amount: 1,
      cost: 2.5,
    },
  ];

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
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
  ];

  return (
    <div>
      <DatePicker.RangePicker />
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div>
  );
}
