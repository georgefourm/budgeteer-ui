import React, { useState } from "react";
import { Card } from "antd";
import IncomeList from "./IncomeList";
import IncomeTypeList from "./IncomeTypeList";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

export default function Expenses() {
  const tabList = [
    {
      key: "list",
      tab: "List",
    },
    {
      key: "types",
      tab: "Types",
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
          <IncomeList />
        </Route>
        <Route path={`${match.path}/types`}>
          <IncomeTypeList />
        </Route>
      </Switch>
    </Card>
  );
}
