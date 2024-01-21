import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Route, useAppStore } from "./stores/appStore";
import { useEffect } from "react";
import UpdateSWModal from "./components/modals/UpdateSWModal";
import MonsterDetailsModal from "./components/modals/MonsterDetailsModal";
import ContentListModal from "./components/modals/ContentListModal";
import LineupModal from "./components/modals/LineupModal";
import BattleModal from "./components/modals/BattleModal";
import ItemDetailsModal from "./components/modals/ItemDetailsModal";

function App() {
  const location = useLocation();

  useEffect(() => {
    let route: Route = "any";

    if (location.pathname.indexOf("/shop") !== -1) route = "shop";
    else if (location.pathname.indexOf("/bag") !== -1) route = "bag";
    else if (location.pathname.indexOf("/campaign") !== -1) route = "campaign";
    else if (location.pathname.indexOf("/map") !== -1) route = "map";
    else if (location.pathname.indexOf("/events") !== -1) route = "events";

    useAppStore.setState((s) => { s.route = route });
  }, [location.pathname]);

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Outlet />

        {/* Modals */}
        <UpdateSWModal />
        <ItemDetailsModal />
        <MonsterDetailsModal />
        <LineupModal />
        <ContentListModal />
        <BattleModal />
      </MantineProvider>

      <ScrollRestoration />
    </>
  )
}

export default App
