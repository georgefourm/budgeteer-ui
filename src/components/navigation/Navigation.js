import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Menu } from "antd";

export default function Navigation() {
  const location = useLocation();
  const [_, basePath] = location.pathname.split("/");

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[basePath]}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="incomes">
        <Link to="/incomes/list">Incomes</Link>
      </Menu.Item>
      <Menu.Item key="expenses">
        <Link to="/expenses/list">Expenses</Link>
      </Menu.Item>
    </Menu>
  );
}
