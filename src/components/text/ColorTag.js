import { Tag } from "antd";

export default function ColorTag(values) {
  const allColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  const colorMap = {};
  values.forEach((val, idx) => {
    colorMap[val.id] = allColors[idx % allColors.length];
  });
  return ({ id }) => {
    return (
      <Tag color={colorMap[id]}>{values.find((v) => v.id == id).name}</Tag>
    );
  };
}
