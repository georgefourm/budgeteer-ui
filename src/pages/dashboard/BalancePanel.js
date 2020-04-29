import React, { useState, useEffect } from "react";
import { Card, Col, Row, Statistic, DatePicker } from "antd";
import { get } from "utils/network";
import moment from "moment";
import "./dashboard.scss";

export default function BalancePanel() {
  const [stats, setStats] = useState({
    totalExpenses: 0,
    totalIncome: 0,
  });
  const [endDate, setEndDate] = useState(moment());
  const [startDate, setStartDate] = useState(endDate.clone().startOf("month"));
  useEffect(() => {
    get("dashboard/balance", {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }).then((response) => {
      setStats({
        ...response,
      });
    });
  }, [startDate, endDate]);
  return (
    <Row gutter={24}>
      <Col span={6}>
        <Card>
          <div className="ant-statistic">
            <div className="ant-statistic-title">Selected Range</div>
            <div className="ant-statistic-content">
              <DatePicker.RangePicker
                value={[startDate, endDate]}
                format="DD/MM/YYYY"
                allowClear={false}
                ranges={{
                  "Current Month": [moment().startOf("month"), moment()],
                  "Last Month": [
                    moment().subtract(1, "month").startOf("month"),
                    moment().subtract(1, "month").endOf("month"),
                  ],
                }}
                onChange={(value) => {
                  const [start, end] = value;
                  setStartDate(start);
                  setEndDate(end);
                }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Total Income"
            value={stats.totalIncome || 0}
            precision={2}
            suffix={<span>&euro;</span>}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Total Expenses"
            value={stats.totalExpenses || 0}
            precision={2}
            suffix={<span>&euro;</span>}
          />
        </Card>
      </Col>
      <Col span={6}>
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
  );
}
