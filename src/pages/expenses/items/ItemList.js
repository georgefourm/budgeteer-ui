import React, { useState, useEffect } from "react";
import { get, put, post, del } from "utils/network";
import CrudTable from "components/crud/CrudTable";
import { Form, Input, Select } from "antd";

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
  ];

  const onCreate = async (values) => {
    const created = await post("items", values);
    setItems([created, ...items]);
  };

  const onUpdate = async (id, values) => {
    const updated = await put(`items/${id}`, values);
    setItems(items.map((i) => (i.id === id ? updated : i)));
  };

  const onDelete = async (id) => {
    await del(`items/${id}`);
    setItems(items.filter((i) => i.id !== id));
  };

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        categoryId: editing.category ? editing.category.id : null,
        ...editing,
      });
    }
    return (
      <React.Fragment>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "The Item name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Default Cost" name="defaultCost">
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="categoryId">
          <Select
            placeholder="Item category"
            allowClear={true}
            showSearch
            filterOption={(value, option) =>
              option.children.toLowerCase().includes(value.toLowerCase())
            }
          >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </React.Fragment>
    );
  };
  return (
    <CrudTable
      data={items}
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
