import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Incomes from "./pages/incomes";

import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Header>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="/dashboard">
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="/incomes">
                <Link to="/incomes">Incomes</Link>
              </Menu.Item>
              <Menu.Item key="/expenses">
                <Link to="/expenses/list">Expenses</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content className="content">
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/incomes">
                <Incomes />
              </Route>
              <Route path="/expenses">
                <Expenses />
              </Route>
            </Switch>
          </Content>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
