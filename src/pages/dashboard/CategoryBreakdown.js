import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CategoryBreakDown({ data }) {
  return (
    <ResponsiveContainer width="95%" height={300}>
      <PieChart>
        <Tooltip />
        <Legend
          verticalAlign="top"
          height={36}
          margin={{
            top: 0,
            bottom: 20,
          }}
        />
        <Pie
          data={data}
          labelLine={false}
          outerRadius={110}
          innerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
