import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/navigation/Root";

import Expenses from "./pages/expenses";
// import Incomes from "./pages/incomes";

// Expenses
import ExpenseList from "./pages/expenses/list/ExpenseList";
import CategoryList from "./pages/expenses/categories/CategoryList";
import ItemList from "./pages/expenses/items/ItemList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/expenses",
          element: <Expenses />,
          children: [
            {
              path: "/expenses/list",
              element: <ExpenseList />,
              index: true,
            },
            {
              path: "/expenses/items",
              element: <ItemList />,
            },
            {
              path: "/expenses/categories",
              element: <CategoryList />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
