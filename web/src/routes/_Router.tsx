import React, { Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import CenterLoader from "@/components/loaders/CenterLoader";
import { util } from "@/lib/util";
import App from "../App";

// Lazy routes \\
const Home = React.lazy(util.wait(() => import("./main/Home")));
const Dashboard = React.lazy(util.wait(() => import("./dashboard/Dashboard")));
const NotFound = React.lazy(util.wait(() => import("./NotFound")));
// Lazy routes \\

// Lazy layouts \\
const MainLayout = React.lazy(util.wait(() => import("../components/layouts/MainLayout")));
const DashboardLayout = React.lazy(util.wait(() => import("../components/layouts/DashboardLayout")));
// Lazy layouts \\

function Page(Component: React.LazyExoticComponent<React.ComponentType<any>>) {
  return (
    <Suspense fallback={<CenterLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Navigate to "/home" on path "/" */}
      <Route index element={<Navigate to="/home" />} />

      <Route element={Page(MainLayout)}>
        <Route path="/home" element={Page(Home)} />
      </Route>

      <Route element={Page(DashboardLayout)}>
        <Route path="/dashboard" element={Page(Dashboard)} />
      </Route>

      {/* Error routes & catch all */}
      <Route path="/404" element={Page(NotFound)} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
)
