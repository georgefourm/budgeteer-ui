import React, { useState, useEffect } from "react";
import { get, put, post, del } from "../../utils/network";
import moment from "moment";
import CrudTable from "../crud/CrudTable";
import { Form, DatePicker, Input } from "antd";
import ListSelect from "components/crud/ListSelect";
import { getLabelColumnProps } from "components/crud/utils";

export default function ExpenseTable({ expenses, setExpenses, live = true }) {
  const [categories, setCategories] = useState([]);
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    get("categories").then((response) => {
      setCategories(response);
    });
    get("members").then((response) => {
      setMembers(response);
    });
    get("groups").then((response) => {
      setGroups(response);
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
      dataIndex: ["categoryId"],
      key: "id",
      ...getLabelColumnProps(categories, "categoryId"),
    },
    {
      title: "Member",
      dataIndex: ["memberId"],
      key: "id",
      ...getLabelColumnProps(members, "memberId"),
    },
    {
      title: "Group",
      dataIndex: ["groupId"],
      key: "id",
      ...getLabelColumnProps(groups, "groupId"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
  ];
  const onUpdate = async (oldValues, newValues) => {
    const finalValues = oldValues.map((val) => ({ ...val, ...newValues }));
    if (live) {
      await Promise.all(
        finalValues.map((val) => put(`expenses/${val.id}`, val))
      );
    }
    setExpenses(
      expenses.map((e) => {
        const newVal = finalValues.find((v) => v.id == e.id);
        if (newVal) {
          e = newVal;
        }
        return e;
      })
    );
  };

  const onCreate = async (values) => {
    let created = values;

    if (live) {
      created = await post("expenses", values);
    } else {
      created.id = expenses[expenses.length - 1].id + 1;
    }
    setExpenses([created, ...expenses]);
  };

  const onDelete = async (selectedRows) => {
    if (live) {
      await Promise.all(selectedRows.map((row) => del(`expenses/${row.id}`)));
    }
    setExpenses(
      expenses.filter((exp) => !selectedRows.find((r) => r.id == exp.id))
    );
  };

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        ...editing,
        boughtAt: editing.boughtAt ? moment(editing.boughtAt) : null,
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
        <ListSelect
          items={categories}
          name="categoryId"
          label="Category"
          required={!editing}
        />
        <ListSelect
          items={members}
          name="memberId"
          label="Member"
          required={false}
        />
        <ListSelect
          items={groups}
          name="groupId"
          label="Group"
          required={false}
        />
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
