import React from "react";
import { Routes, Route } from "react-router-dom";

import { StakePage } from "./Stake/StakePage";
import { WithdrawPage } from "./Withdraw/WithdrawPage";
import { ClaimReawardsPage } from "./ClaimRewards/ClaimRewardsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StakePage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/claimrewards" element={<ClaimReawardsPage />} />
    </Routes>
  );
};
