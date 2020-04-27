import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { get } from "utils/network";
import "./dashboard.scss";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalExpenses: 0,
    totalIncome: 0,
  });
  useEffect(() => {
    get("dashboard").then((response) => {
      setStats({
        ...response,
        balance: response.totalIncome - response.totalExpenses,
      });
    });
  });
  return (
    <div>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Income"
              value={stats.totalIncome || 0}
              precision={2}
              suffix={<span>&euro;</span>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={stats.totalExpenses || 0}
              precision={2}
              suffix={<span>&euro;</span>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Balance"
              className={stats.balance > 0 ? "stat-positive" : "stat-negative"}
              value={stats.balance}
              precision={2}
              suffix={<span>&euro;</span>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
