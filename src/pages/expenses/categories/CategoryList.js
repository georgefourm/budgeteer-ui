import React, { useState, useEffect } from "react";
import CrudTable from "components/crud/CrudTable";
import { get, put, post, del } from "utils/network";
import { Form, Input, Select } from "antd";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get("categories").then((response) => {
      setCategories(response);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Parent",
      dataIndex: ["parent", "name"],
      key: "id",
    },
  ];

  const onCreate = async (values) => {
    const response = await post("categories", values);
    setCategories([response, ...categories]);
  };

  const onUpdate = async (id, values) => {
    const response = await put("categories/" + id, values);
    setCategories(categories.map((cat) => (cat.id === id ? response : cat)));
  };

  const onDelete = async (id) => {
    await del(`categories/${id}`);
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const renderForm = (form, editing) => {
    if (editing) {
      form.setFieldsValue({
        name: editing.name,
        parentId: editing.parent ? editing.parent.id : null,
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
              message: "The Category name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Parent" name="parentId">
          <Select placeholder="Parent category" allowClear={true}>
            {categories
              .filter((cat) => !cat.parent)
              .map((category) => (
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
      data={categories}
      columns={columns}
      renderForm={renderForm}
      formProps={{ name: "category" }}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
