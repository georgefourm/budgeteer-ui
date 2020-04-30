import React, { useEffect, useState } from "react";
import BalanceByMonthChart from "./BalanceByMonthChart";
import CategoryBreakdown from "./CategoryBreakdown";
import { Card, Col, Row } from "antd";
import { get } from "utils/network";
import moment from "moment";

export default function AnalysisPanel() {
  const [categories, setCategories] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const fetchData = async (startDate, endDate) => {
    const expensesBreakdown = await get("expenses/breakdown");
    setCategories(expensesBreakdown);
    const monthlyIncome = await get("incomes/monthly", { startDate, endDate });
    const mapTimestamps = (item) => ({
      amount: item.amount,
      date: moment(item.date).toDate().getTime(),
    });
    setIncome(monthlyIncome.map(mapTimestamps));
    const monthlyExpenses = await get("expenses/monthly", {
      startDate,
      endDate,
    });
    setExpenses(monthlyExpenses.map(mapTimestamps));
  };
  useEffect(() => {
    fetchData(
      moment().subtract(6, "months").toISOString(),
      moment().toISOString()
    );
  }, []);
  return (
    <Row gutter={24}>
      <Col span={16}>
        <Card title="Expenses/Income by Month">
          <BalanceByMonthChart {...{ income, expenses }} />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Expenses breakdown by category">
          <CategoryBreakdown data={categories} />
        </Card>
      </Col>
    </Row>
  );
}
