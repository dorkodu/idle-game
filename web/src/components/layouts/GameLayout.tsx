import { Button, Divider, Flex, useMantineTheme } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import LayoutButton from "../buttons/LayoutButton";
import { useAppStore } from "@/stores/appStore";
import ProfileButton from "../buttons/ProfileButton";
import ResourceButton from "../buttons/ResourceButton";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { useDisclosure } from "@mantine/hooks";
import PlayerDetailsModal from "../modals/local/PlayerDetailsModal";

function GameLayout() {
  const [opened, { open, close }] = useDisclosure();

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const route = useAppStore(state => state.route);

  const player = useApiStore(state => state.player);
  const level = player?.level;
  const gold = player?.items[game.constants.goldId]?.count;
  const gem = player?.items[game.constants.gemId]?.count;

  return (
    <>
      <Flex
        direction="column" mx="auto"
        pos="fixed" top={0} left={0} right={0}
        maw={theme.breakpoints.xs} h={80}
      >
        <Flex direction="row" align="center" gap="xs" px="md" h="100%">
          <ProfileButton level={level} onClick={open} />

          <Flex gap="xs" justify="end" style={{ flex: 1 }}>
            <ResourceButton emoji="🪙" count={gold} button />
            <ResourceButton emoji="💎" count={gem} button />
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

      <PlayerDetailsModal opened={opened} onClose={close} />
    </>
  )
}

export default GameLayout