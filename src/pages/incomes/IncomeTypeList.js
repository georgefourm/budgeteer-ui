import React, { useState, useEffect } from "react";
import CrudTable from "../../components/crud/CrudTable";
import { get, post, put, del } from "../../utils/network";
import { Form, Input, Select } from "antd";

export default function IncomeTypeList() {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    get("/income-types").then((response) => {
      setTypes(response);
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
    const response = await post("income-types", values);
    setTypes([response, ...types]);
  };

  const onUpdate = async (id, values) => {
    const response = await put("income-types/" + id, values);
    setTypes(types.map((cat) => (cat.id === id ? response : cat)));
  };

  const onDelete = async (id) => {
    await del(`income-types/${id}`);
    setTypes(types.filter((cat) => cat.id !== id));
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
              message: "The Type name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Parent" name="parentId">
          <Select placeholder="Parent type" allowClear={true}>
            {types
              .filter((cat) => !cat.parent)
              .map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </React.Fragment>
    );
  };
  return (
    <CrudTable
      data={types}
      columns={columns}
      renderForm={renderForm}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
