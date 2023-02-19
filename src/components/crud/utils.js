import ColorTag from "components/text/ColorTag";
export function getLabelColumnProps(items, key) {
  let filters = [
    {
      text: "--None--",
      value: null,
    },
  ];
  filters = filters.concat(
    items
      .map((c) => ({ text: c.name, value: c.id }))
      .sort((a, b) => a.text.localeCompare(b.text))
  );
  const LabelTag = ColorTag(items);

  return {
    render: (id) => id && <LabelTag id={id} />,
    filterSearch: true,
    filters: filters,
    onFilter: (value, record) => record[key] == value,
  };
}
