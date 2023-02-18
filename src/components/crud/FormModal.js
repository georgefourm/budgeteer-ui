import React from "react";
import { Modal, Form } from "antd";
import { useResetFormOnCloseModal } from "utils/hooks";

export default function FormModal({
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
      open={visible}
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
