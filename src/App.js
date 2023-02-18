import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/navigation/Root";

import ExpenseList from "./pages/expenses/list/ExpenseList";
import Dashboard from "pages/dashboard";
import IncomeList from "pages/incomes/IncomeList";
import ImportPage from "pages/administration/import/ImportPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/expenses",
          element: <ExpenseList />,
        },
        {
          path: "/incomes",
          element: <IncomeList />,
        },
        {
          path: "/administration",
          element: <ImportPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
