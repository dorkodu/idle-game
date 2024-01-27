import React, { Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import CenterLoader from "@/components/loaders/CenterLoader";
import { util } from "@/lib/util";
import App from "../App";

// Lazy routes \\
const Home = React.lazy(util.wait(() => import("./Home")));

const Shop = React.lazy(util.wait(() => import("./main/Shop")));
const Bag = React.lazy(util.wait(() => import("./main/Bag")));
const Campaign = React.lazy(util.wait(() => import("./main/Campaign")));
const Map = React.lazy(util.wait(() => import("./main/Map")));
const Events = React.lazy(util.wait(() => import("./main/Events")));

const PrivacyPolicy = React.lazy(util.wait(() => import("./PrivacyPolicy")));
const TermsOfService = React.lazy(util.wait(() => import("./TermsOfService")));

const NotFound = React.lazy(util.wait(() => import("./NotFound")));
// Lazy routes \\

// Lazy layouts \\
const MainLayout = React.lazy(util.wait(() => import("../components/layouts/MainLayout")));
const GameLayout = React.lazy(util.wait(() => import("../components/layouts/GameLayout")));
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

      <Route element={Page(MainLayout)}>
        <Route path="/" element={Page(Home)} />
        <Route path="/privacy-policy" element={Page(PrivacyPolicy)} />
        <Route path="/terms-of-service" element={Page(TermsOfService)} />

        {/* Error routes & catch all */}
        <Route path="/404" element={Page(NotFound)} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route element={Page(GameLayout)}>
        <Route path="/shop" element={Page(Shop)} />
        <Route path="/bag" element={Page(Bag)} />
        <Route path="/campaign" element={Page(Campaign)} />
        <Route path="/map" element={Page(Map)} />
        <Route path="/events" element={Page(Events)} />
      </Route>

    </Route>
  )
)
