import React from "react";
import { Outlet } from "react-router-dom";

export const UserContent = () => {
  return (
    <div className="main-wrapper">

      <Outlet />
    </div>
  );
};
