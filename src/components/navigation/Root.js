import React from "react";
import Navigation from "./Navigation";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

function Root() {
  return (
    <div>
      <Header>
        <Navigation />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}

export default Root;
