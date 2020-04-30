import React from "react";
import moment from "moment";

import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

const formatter = (unixTime) => moment(unixTime).format("MMMM");

const BalanceByMonthChart = ({ income, expenses }) => (
  <ResponsiveContainer width="95%" height={300}>
    <LineChart>
      <XAxis
        dataKey="date"
        domain={["auto", "auto"]}
        name="Date"
        scale="time"
        tickFormatter={formatter}
        type="number"
      />
      <Tooltip labelFormatter={formatter} />

      <YAxis name="Amount" />
      <Legend />
      <Line
        data={income}
        type="linear"
        name="Income"
        dataKey="amount"
        stroke="#0088FE"
      />
      <Line
        data={expenses}
        type="linear"
        name="Expenses"
        dataKey="amount"
        stroke="#00C49F"
      />
    </LineChart>
  </ResponsiveContainer>
);

export default BalanceByMonthChart;
