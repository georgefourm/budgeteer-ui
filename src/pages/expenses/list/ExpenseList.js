import ExpenseTable from "components/expenses/ExpenseTable";
import { useState, useEffect } from "react";
import { get } from "utils/network";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    get("expenses").then((response) => {
      setExpenses(response);
    });
  }, []);

  return (
    <ExpenseTable expenses={expenses} setExpenses={setExpenses} live={true} />
  );
}
