import { Col, Row } from "antd";
import ImportForm from "./ImportForm";
import { useState } from "react";
import { postMultipart, post } from "utils/network";
import ExpenseTable from "components/expenses/ExpenseTable";

export default function ImportPage() {
  const [expenses, setExpenses] = useState([]);
  const onImport = async (values) => {
    const config = {
      memberId: values.memberId,
      fileConfiguration: {
        ...values,
      },
    };
    const data = new FormData();
    const blob = new Blob([JSON.stringify(config)], {
      type: "application/json",
    });
    data.append("configuration", blob);
    data.append("file", values.files.file);
    const imported = await postMultipart("import", data);
    setExpenses(
      imported.transactions.expenses.map((exp, idx) => ({ ...exp, id: idx }))
    );
  };

  const onSubmit = async () => {
    await post("expenses/bulk", expenses);
    setExpenses([]);
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <ImportForm onImport={onImport} onSubmit={onSubmit} />
      </Col>
      <Col span={18}>
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          live={false}
        />
      </Col>
    </Row>
  );
}
