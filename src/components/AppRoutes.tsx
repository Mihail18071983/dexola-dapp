import React from "react";
import { Routes, Route } from "react-router-dom";

import { StakePage } from "./Pages/StakePage";
import { WithdrawPage } from "./Pages/WithdrawPage";
import { ClaimReawardsPage } from "./Pages/ClaimRewardsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StakePage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/claimrewards" element={<ClaimReawardsPage />} />
    </Routes>
  );
};
