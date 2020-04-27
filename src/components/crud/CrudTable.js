import React, { useState } from "react";
import { Table, Button, Space, Divider } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormModal from "./FormModal";
import { useKeyBinding } from "utils/hooks";

export default function CrudTable({
  data,
  columns,
  renderForm,
  formProps = {},
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);

  const onSave = async (values) => {
    if (editing) {
      setEditing(null);
      await onUpdate(editing.id, values);
    } else {
      await onCreate(values);
    }
    setModalVisible(false);
  };

  const onUpdateClicked = (record) => {
    setEditing(record);
    setModalVisible(true);
  };
  const onDeleteClicked = async (id) => {
    await onDelete(id);
  };
  const onCancel = () => {
    setModalVisible(false);
    setEditing(null);
  };

  useKeyBinding("c", () => {
    if (!modalVisible) {
      setModalVisible(true);
    }
  });

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        <PlusOutlined /> Add New
      </Button>
      <Divider />
      <FormModal
        {...{
          renderForm,
          formProps,
          onCancel,
          editing,
          onSave,
          visible: modalVisible,
        }}
      />
      <Table
        dataSource={data}
        bordered
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "id",
            render: (text, record) => (
              <Space>
                <Button onClick={() => onUpdateClicked(record)}>
                  <EditOutlined />
                  Edit
                </Button>
                <Button onClick={() => onDeleteClicked(record.id)}>
                  <DeleteOutlined />
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        rowKey="id"
      />
    </div>
  );
}
