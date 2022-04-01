import React from "react";
import { Navigate } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./views/login/Login";
import { Outlet } from "react-router-dom";
import Page404 from "./views/pages/Page404";
import Dashboard from "./views/dashboard";
import SoftwareWrapper from "./views/software/SoftwareWrapper";
import DeviceTypeWrapper from "views/device-type/DeviceTypeWrapper";
import DeviceWrapper from "views/device/DeviceWrapper";
import DeviceDetailWrapper from "views/device/DeviceDetailWrapper";

const routes = (cookies: any) => [
  {
    path: "app",
    element: cookies?.access_token ? <MainLayout /> : <Navigate to="/" />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "software", element: <SoftwareWrapper /> },
      { path: "device-types", element: <DeviceTypeWrapper /> },
      { path: "devices", element: <DeviceWrapper /> },
      { path: "devices/:id", element: <DeviceDetailWrapper /> },
      {
        path: "/app/",
        element: cookies?.access_token ? (
          <Navigate to="/app/dashboard" />
        ) : (
          <Navigate to="/login" />
        ),
      },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: cookies?.access_token ? (
      <Navigate to="/app/dashboard" />
    ) : (
      <>
        <Outlet />
      </>
    ),
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      {
        path: "/",
        element: cookies?.access_token ? (
          <Navigate to="/app/dashboard" />
        ) : (
          <Navigate to="/login" />
        ),
      },
      { path: "404", element: <Page404 /> },
      { path: "login", element: <Login /> },
    ],
  },
];

export default routes;
