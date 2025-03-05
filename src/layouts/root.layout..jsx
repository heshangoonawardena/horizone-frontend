import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
};

export default RootLayout;
