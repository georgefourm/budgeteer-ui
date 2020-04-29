import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TimeSeriesChart = ({ chartData }) => (
  <ResponsiveContainer width="95%" height={300}>
    <ScatterChart>
      <XAxis
        dataKey="time"
        domain={["auto", "auto"]}
        name="Time"
        tickFormatter={(unixTime) => moment(unixTime).format("DD/MM")}
        type="number"
      />
      <YAxis dataKey="value" name="Value" />

      <Scatter
        data={chartData}
        line={{ stroke: "#000" }}
        lineJointType="monotoneX"
        lineType="joint"
        name="Values"
      />
    </ScatterChart>
  </ResponsiveContainer>
);

TimeSeriesChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default TimeSeriesChart;
