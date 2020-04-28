import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import "./dashboard.scss";
import BalancePanel from "./BalancePanel";
import TimeSeriesChart from "./TimeSeriesChart";
import CategoryBreakdown from "./CategoryBreakdown";
import { get } from "utils/network";
const chartData = [
  { value: 14, time: 1503617297689 },
  { value: 15, time: 1503616962277 },
  { value: 15, time: 1503616882654 },
  { value: 20, time: 1503613184594 },
  { value: 15, time: 1503611308914 },
];

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get("expenses/breakdown").then((result) => {
      setCategories(
        result.map((item) => ({
          name: item.category,
          value: item.totalCost,
        }))
      );
    });
  });
  return (
    <div>
      <BalancePanel />
      <br />
      <Row gutter={24}>
        <Col span={16}>
          <Card title="Expenses/Income by month">
            <TimeSeriesChart chartData={chartData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Expenses breakdown by category">
            <CategoryBreakdown data={categories} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
