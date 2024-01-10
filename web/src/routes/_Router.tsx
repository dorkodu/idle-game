import React, { Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import CenterLoader from "@/components/loaders/CenterLoader";
import { util } from "@/lib/util";
import App from "../App";

// Lazy routes \\
const Shop = React.lazy(util.wait(() => import("./main/Shop")));
const Bag = React.lazy(util.wait(() => import("./main/Bag")));
const Campaign = React.lazy(util.wait(() => import("./main/Campaign")));
const Map = React.lazy(util.wait(() => import("./main/Map")));
const Events = React.lazy(util.wait(() => import("./main/Events")));

const NotFound = React.lazy(util.wait(() => import("./NotFound")));
// Lazy routes \\

// Lazy layouts \\
const MainLayout = React.lazy(util.wait(() => import("../components/layouts/MainLayout")));
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
      {/* Navigate to "/campaign" on path "/" */}
      <Route index element={<Navigate to="/campaign" />} />

      <Route element={Page(MainLayout)}>
        <Route path="/shop" element={Page(Shop)} />
        <Route path="/bag" element={Page(Bag)} />
        <Route path="/campaign" element={Page(Campaign)} />
        <Route path="/map" element={Page(Map)} />
        <Route path="/events" element={Page(Events)} />
      </Route>

      {/* Error routes & catch all */}
      <Route path="/404" element={Page(NotFound)} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
)
