import React from "react";
import { Card, Col, Row } from "antd";
import "./dashboard.scss";
import BalancePanel from "./BalancePanel";

export default function Dashboard() {
  return (
    <div>
      <BalancePanel />
      <br />
      <Row gutter={24}>
        <Col span={16}>
          <Card title="Expenses/Income by month" />
        </Col>
        <Col span={8}>
          <Card title="Expenses breakdown by category" />
        </Col>
      </Row>
    </div>
  );
}
