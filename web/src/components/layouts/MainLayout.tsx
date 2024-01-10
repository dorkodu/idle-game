import { Button, Divider, Flex, useMantineTheme } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import LayoutButton from "../buttons/LayoutButton";
import { useAppStore } from "@/stores/appStore";
import ProfileButton from "../buttons/ProfileButton";
import ResourceButton from "../buttons/ResourceButton";

function MainLayout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const route = useAppStore(state => state.route);

  return (
    <>
      <Flex
        direction="column" mx="auto"
        pos="fixed" top={0} left={0} right={0}
        maw={theme.breakpoints.xs} h={80}
      >
        <Flex direction="row" align="center" gap="xs" px="md" h="100%">
          <ProfileButton level={1} />

          <Flex gap="xs" justify="end" style={{ flex: 1 }}>
            <ResourceButton emoji="🪙" count={123456} button />
            <ResourceButton emoji="💎" count={123456} button />
          </Flex>
        </Flex>
        <Divider />
      </Flex>

      <Flex
        direction="column" mx="auto" p="md"
        pos="fixed" top={80} bottom={64} left={0} right={0}
        maw={theme.breakpoints.xs}
      >
        <Outlet />
      </Flex>

      <Flex
        direction="column" mx="auto"
        pos="fixed" bottom={0} left={0} right={0}
        maw={theme.breakpoints.xs} h={64}
      >
        <Divider />
        <Button.Group h="100%">
          <LayoutButton onClick={() => navigate("/shop")} active={route === "shop"} emoji="🛒">Shop</LayoutButton>
          <LayoutButton onClick={() => navigate("/bag")} active={route === "bag"} emoji="🎒">Bag</LayoutButton>
          <LayoutButton onClick={() => navigate("/campaign")} active={route === "campaign"} emoji="⚔️">Campaign</LayoutButton>
          <LayoutButton onClick={() => navigate("/map")} active={route === "map"} emoji="🗺">Map</LayoutButton>
          <LayoutButton onClick={() => navigate("/events")} active={route === "events"} emoji="📢">Events</LayoutButton>
        </Button.Group>
      </Flex>
    </>
  )
}

export default MainLayout