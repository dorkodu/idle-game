import { assets } from "@/assets/assets";
import RouteButton from "@/components/buttons/RouteButton"
import Content from "@/components/custom/Content";
import FullscreenModal from "@/components/custom/FullscreenModal"
import { Button, Card, Flex, ScrollArea, SegmentedControl } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconArrowBigDownFilled } from "@tabler/icons-react";

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

function TowerModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      TowerModal
    </FullscreenModal>
  )
}

function ArenaModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      ArenaModal
    </FullscreenModal>
  )
}

function BlacksmithModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      BlacksmithModal
    </FullscreenModal>
  )
}

function AltarModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      <Flex direction="column" align="center" justify="center" h="100%">
        <Card withBorder radius="md" w="100%" maw={360} h={360}>
          <Flex direction="column" gap="md" h="100%">

            <SegmentedControl
              data={[
                { value: "evolve", label: "Evolve" },
                { value: "sacrifice", label: "Sacrifice" },
              ]}
            />

            <Flex direction="column" align="center" justify="center" gap="md" style={{ flex: 1 }}>
              <Flex gap="xs">
                <Content placeholder={assets.monster("angel")} />
                <Content placeholder={assets.monster("angel")} />
                <Content placeholder={assets.monster("angel")} />
              </Flex>

              <IconArrowBigDownFilled />

              <Content placeholder={assets.monster("angel")} />
            </Flex>

            <Button>Evolve</Button>

          </Flex>
        </Card>
      </Flex>
    </FullscreenModal>
  )
}