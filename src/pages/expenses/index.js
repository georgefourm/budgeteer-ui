import React, { useState } from "react";
import { Card } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Expenses() {
  const tabList = [
    {
      key: "list",
      tab: "List",
    },
    {
      key: "categories",
      tab: "Categories",
    },
    {
      key: "items",
      tab: "Items",
    },
  ];

  let location = useLocation();
  let navigate = useNavigate();
  let path = location.pathname.split("/");
  const tab = path.length > 0 ? path[2] : "list";

  return (
    <Card
      className="body-card"
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={(newTab) => {
        navigate(newTab);
      }}
    >
      <Outlet />
    </Card>
  );
}
