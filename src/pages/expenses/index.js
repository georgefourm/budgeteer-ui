import React, { useState } from "react";
import { Card } from "antd";
import ExpenseList from "./ExpenseList";
import CategoryList from "./CategoryList";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

export default function Expenses() {
  const tabList = [
    {
      key: "list",
      tab: "List",
    },
    {
      key: "items",
      tab: "Items",
    },
    {
      key: "categories",
      tab: "Categories",
    },
  ];
  const match = useRouteMatch();
  const history = useHistory();

  const pathParts = history.location.pathname.split("/");
  const [tab, setTab] = useState(pathParts[2]);

  return (
    <Card
      className="body-card"
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={(newTab) => {
        setTab(newTab);
        history.push(`${match.path}/${newTab}`);
      }}
    >
      <Switch>
        <Route path={`${match.path}/list`}>
          <ExpenseList />
        </Route>
        <Route path={`${match.path}/items`}>
          <h1>Items list</h1>
        </Route>
        <Route path={`${match.path}/categories`}>
          <CategoryList />
        </Route>
      </Switch>
    </Card>
  );
}
