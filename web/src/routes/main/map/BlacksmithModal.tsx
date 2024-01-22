import { assets } from "@/assets/assets";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { IconArrowBigRightFilled } from "@tabler/icons-react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function BlacksmithModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;

  const items = player ? Object.values(player.items).filter(i => game.items[i.id].type !== "other") : undefined;

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🪙" count={gold} />}
    >
      <Card withBorder radius="md" h="100%">
        <ScrollArea>

          <Flex direction="column" gap="md" h="100%">

            <Flex direction="column" align="center" gap="md">
              <Flex align="center" gap="md" pos="relative">
                <Content placeholder={assets.item("we_ancient_sword").image} />
                <IconArrowBigRightFilled />
                <Title order={5} mt={48} pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>0 / 3</Title>
                <Content placeholder={assets.item("we_broad_axe_5").image} />
              </Flex>

              <Button>Upgrade</Button>
            </Flex>

            <Divider label="Items" />

            <ContentList>
              {items?.map(i => <Content key={game.item.id(i)} item={i} onClick={() => { }} />)}
            </ContentList>

          </Flex>
        </ScrollArea>
      </Card>
    </FullscreenModal>
  )
}

export default BlacksmithModal