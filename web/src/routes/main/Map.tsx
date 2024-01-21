import RouteButton from "@/components/buttons/RouteButton"
import FullscreenModal from "@/components/custom/FullscreenModal"
import { Flex, ScrollArea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import TowerModal from "./map/TowerModal";
import BlacksmithModal from "./map/BlacksmithModal";

function Map() {
  const [towerOpened, { open: openTower, close: closeTower }] = useDisclosure();
  const [arenaOpened, { open: openArena, close: closeArena }] = useDisclosure();
  const [blacksmithOpened, { open: openBlacksmith, close: closeBlacksmith }] = useDisclosure();
  const [altarOpened, { open: openAltar, close: closeAltar }] = useDisclosure();

  return (
    <>
      <ScrollArea>
        <Flex direction="column" gap="md">

          <RouteButton emoji="🗼" title="Tower" onClick={openTower} />
          <RouteButton emoji="🏟" title="Arena" onClick={openArena} />
          <RouteButton emoji="⚒" title="Blacksmith" onClick={openBlacksmith} />
          <RouteButton emoji="🪦" title="Altar" onClick={openAltar} />

        </Flex>
      </ScrollArea>

      <TowerModal opened={towerOpened} onClose={closeTower} />
      <ArenaModal opened={arenaOpened} onClose={closeArena} />
      <BlacksmithModal opened={blacksmithOpened} onClose={closeBlacksmith} />
      <AltarModal opened={altarOpened} onClose={closeAltar} />
    </>
  )
}

export default Map

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function ArenaModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      Arena
    </FullscreenModal>
  )
}

function AltarModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      Altar
    </FullscreenModal>
  )
}