import React from "react";
import BalancePanel from "./BalancePanel";
import AnalysisPanel from "./AnalysisPanel";

import "./dashboard.scss";

export default function Dashboard() {
  return (
    <div>
      <BalancePanel />
      <br />
      <AnalysisPanel />
    </div>
  );
}
