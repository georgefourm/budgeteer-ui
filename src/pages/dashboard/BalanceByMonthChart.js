import React from "react";
import PropTypes from "prop-types";
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

const BalanceByMonthChart = ({ chartData }) =>
  console.dir(chartData) || (
    <ResponsiveContainer width="95%" height={300}>
      <LineChart>
        <XAxis
          dataKey="time"
          domain={["auto", "auto"]}
          name="Time"
          tickFormatter={(unixTime) => moment(unixTime).format("MMM")}
          type="number"
        />
        <YAxis dataKey="value" name="Amount" />
        <Tooltip />
        <Legend />
        <Line data={chartData} type="linear" name="Amount" dataKey="value" />
      </LineChart>
    </ResponsiveContainer>
  );

BalanceByMonthChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default BalanceByMonthChart;
