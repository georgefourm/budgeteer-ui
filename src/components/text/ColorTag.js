import { Tag } from "antd";

export default function ColorTag(values) {
  const allColors = [
    "magenta",
    "lime",
    "red",
    "green",
    "volcano",
    "cyan",
    "orange",
    "geekblue",
    "gold",
    "purple",
    "blue",
  ];
  const colorMap = {};
  values.forEach((val, idx) => {
    colorMap[val.id] = allColors[idx % allColors.length];
  });
  return ({ id }) => {
    const val = values.find((v) => v.id == id);
    return <Tag color={colorMap[id]}>{val ? val.name : ""}</Tag>;
  };
}
