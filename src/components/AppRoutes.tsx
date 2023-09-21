import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Grid } from "react-loader-spinner";

const StakePage = lazy(() => import("./Pages/StakePage"));
const WithdrawPage = lazy(() => import("./Pages/WithdrawPage"));
const ClaimReawardsPage = lazy(() => import("./Pages/ClaimRewardsPage"));

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          visible={true}
          wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <Routes>
        <Route path="/" element={<StakePage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/claimrewards" element={<ClaimReawardsPage />} />
      </Routes>
    </Suspense>
  );
};
