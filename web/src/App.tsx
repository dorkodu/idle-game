import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppStore } from "./stores/appStore";
import OverlayLoader from "./components/loaders/OverlayLoader";
import { useEffect } from "react";
import UpdateSWModal from "./components/modals/UpdateSWModal";

function App() {
  const loading = useAppStore(state => state.loading);

  useEffect(() => {
    // TODO: Perform authorization logic
    const timeout = setTimeout(() => {
      useAppStore.setState(s => { s.loading.auth = false });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        {(loading.auth) && <OverlayLoader full={true} />}
        {!loading.auth && <Outlet />}

        {/* Modals */}
        <UpdateSWModal />
      </MantineProvider>

      <ScrollRestoration />
    </>
  )
}

export default App
