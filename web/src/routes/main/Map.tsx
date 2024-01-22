import RouteButton from "@/components/buttons/RouteButton"
import { Flex, ScrollArea, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import TowerModal from "./map/TowerModal";
import BlacksmithModal from "./map/BlacksmithModal";
import AltarModal from "./map/AltarModal";

function Map() {
  const [towerOpened, { open: openTower, close: closeTower }] = useDisclosure();
  const [blacksmithOpened, { open: openBlacksmith, close: closeBlacksmith }] = useDisclosure();
  const [altarOpened, { open: openAltar, close: closeAltar }] = useDisclosure();

  return (
    <>
      <ScrollArea>
        <Flex direction="column" gap="md">

          <RouteButton emoji="🗼" title="Tower" onClick={openTower} />

          <RouteButton emoji="🏟" title="Arena" onClick={() => { }}>
            <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
          </RouteButton>

          <RouteButton emoji="⚒" title="Blacksmith" onClick={openBlacksmith} />

          <RouteButton emoji="🪦" title="Altar" onClick={openAltar} />

        </Flex>
      </ScrollArea>

      <TowerModal opened={towerOpened} onClose={closeTower} />
      <BlacksmithModal opened={blacksmithOpened} onClose={closeBlacksmith} />
      <AltarModal opened={altarOpened} onClose={closeAltar} />
    </>
  )
}

export default Map