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
      <Menu.Item key="expenses">
        <Link to="/expenses">Expenses</Link>
      </Menu.Item>
      <Menu.Item key="incomes">
        <Link to="/incomes">Incomes</Link>
      </Menu.Item>
      <Menu.Item key="administration">
        <Link to="/administration">Administration</Link>
      </Menu.Item>
    </Menu>
  );
}
