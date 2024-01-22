import { assets } from "@/assets/assets";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { IconArrowBigRightFilled } from "@tabler/icons-react";
import { useState } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function BlacksmithModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  const selectedItem = player && selectedItemId ? player.items[selectedItemId] : undefined;
  const upgradedItem = selectedItem ? game.item.getUpgradedItem(selectedItem) : undefined;

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const items = player ? Object.values(player.items).filter(i => game.items[i.id].type !== "other") : undefined;

  const onUpgrade = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      if (!selectedItemId) return;
      game.actions.blacksmithUpgrade.act(s.player, { itemId: selectedItemId });
    });
  }

  const canUpgrade = (): boolean => {
    if (!player) return false;
    if (!selectedItemId) return false;
    return game.actions.blacksmithUpgrade.actable(player, { itemId: selectedItemId });
  }

  const onSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  }

  const onDeselectItem = () => {
    setSelectedItemId(undefined);
  }

  const getAvailableItemCount = (): number => {
    return Math.min(selectedItem?.count ?? 0, 3);
  }

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🪙" count={gold} />}
    >
      <Card withBorder radius="md" h="100%">
        <ScrollArea>
          <Flex direction="column" gap="md" h="100%">

            <Divider label="Upgrade Items" />

            <Flex direction="column" align="center" gap="md">

              <Flex align="center" gap="md" pos="relative">
                <Content
                  placeholder={assets.item("we_ancient_sword").image}
                  item={selectedItem}
                  onClick={onDeselectItem}
                />
                <IconArrowBigRightFilled />
                <Title
                  order={5} mt={48} pos="absolute"
                  style={{ transform: "translate(-50%,0)", left: "50%" }}
                >
                  {`${getAvailableItemCount()} / 3`}
                </Title>
                <Content
                  placeholder={assets.item("we_broad_axe_5").image}
                  item={upgradedItem}
                />
              </Flex>

              <Button onClick={onUpgrade} disabled={!canUpgrade()}>Upgrade</Button>

            </Flex>

            <Divider label="Items" />

            <ContentList>
              {items?.map(i => <Content key={game.item.id(i)} item={i} onClick={() => onSelectItem(game.item.id(i))} />)}
            </ContentList>

          </Flex>
        </ScrollArea>
      </Card>
    </FullscreenModal>
  )
}

export default BlacksmithModal