import React, { useState } from "react";
import { Table, Button, Space, Divider, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FormModal from "./FormModal";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSave = async (values) => {
    if (editing) {
      setEditing(null);
      Object.keys(values).forEach((key) => {
        if (values[key] === null) {
          delete values[key];
        }
      });
      await onUpdate(selectedRows, values);
    } else {
      await onCreate(values);
    }
    setModalVisible(false);
  };

  const onUpdateClicked = () => {
    const editingRecord = {};
    selectedRows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (editingRecord[key] === undefined) {
          editingRecord[key] = row[key];
        } else if (editingRecord[key] != row[key]) {
          editingRecord[key] = null;
        }
      });
    });
    setEditing(editingRecord);
    setModalVisible(true);
  };
  const onDeleteClicked = async () => {
    setLoading(true);
    await onDelete(selectedRows);
    setLoading(false);
    setConfirmOpen(false);
  };
  const onCancel = () => {
    setModalVisible(false);
    setEditing(null);
  };

  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
          loading={loading}
        >
          <PlusOutlined /> Add New
        </Button>
        <Button onClick={() => onUpdateClicked()} loading={loading}>
          <EditOutlined /> Edit
        </Button>

        <Button danger onClick={() => setConfirmOpen(true)} loading={loading}>
          <DeleteOutlined /> Delete
        </Button>
        <Popconfirm
          title="Delete Records"
          description={`Are you sure you want to delete the selected ${selectedRows.length} record(s)?`}
          open={confirmOpen}
          onConfirm={() => onDeleteClicked()}
          placement={"right"}
          onCancel={() => setConfirmOpen(false)}
        ></Popconfirm>
      </Space>

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
        rowSelection={{
          type: "checkbox",
          onChange: (keys, rows, info) => {
            setSelectedRows(rows);
          },
        }}
        bordered
        size="small"
        columns={[...columns]}
        rowKey="id"
      />
    </div>
  );
}
