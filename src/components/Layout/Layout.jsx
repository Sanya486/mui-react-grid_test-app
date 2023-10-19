import React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../AppBar/AppBar";

const Layout = () => {
  return (
    <>
      <DrawerAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
