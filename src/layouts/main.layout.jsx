import React from "react";
import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
