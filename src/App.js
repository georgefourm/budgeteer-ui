import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";

import Dashboard from "./pages/dashboard";
import Expenses from "./pages/expenses";
import Incomes from "./pages/incomes";

import { Layout } from "antd";
const { Header, Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Header>
            <Navigation />
          </Header>
          <Content className="content">
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard">
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
