import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

function FormModal({
  renderForm,
  formProps,
  onCancel,
  editing,
  onSave,
  visible,
}) {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });
  return (
    <Modal
      title={editing ? "Edit" : "Add new"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
    >
      <Form form={form} onFinish={onSave} layout="vertical" {...formProps}>
        {renderForm(form, editing)}
      </Form>
    </Modal>
  );
}

export default function CrudTable({
  data,
  columns,
  renderForm,
  formProps,
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
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add New
      </Button>
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
