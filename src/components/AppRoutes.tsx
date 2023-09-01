import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main } from "../Pages/Main";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />    
    </Routes>
  );
};
