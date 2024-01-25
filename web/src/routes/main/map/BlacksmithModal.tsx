import { assets } from "@/assets/assets";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IItem } from "@game/core/item";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, ScrollArea, Title } from "@mantine/core";
import { IconArrowBigRightFilled } from "@tabler/icons-react";
import { useState } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function BlacksmithModal({ opened, onClose }: ModalProps) {
  const [tab, setTab] = useState<"unlock" | "upgrade" | "sell">("upgrade");

  const player = useApiStore(state => state.player);
  const gold = player?.items[game.constants.goldId]?.count ?? 0;

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🪙" count={gold} />}
    >
      <Card withBorder radius="md" h="100%">
        <ScrollArea>
          <Flex direction="column" gap="md" h="100%">

            <Button.Group mx="auto" w="100%" maw={360}>
              <Button fullWidth px={0} variant={tab !== "unlock" ? "default" : undefined} onClick={() => setTab("unlock")}>Unlock</Button>
              <Button fullWidth px={0} variant={tab !== "upgrade" ? "default" : undefined} onClick={() => setTab("upgrade")}>Upgrade</Button>
              <Button fullWidth px={0} variant={tab !== "sell" ? "default" : undefined} onClick={() => setTab("sell")}>Sell</Button>
            </Button.Group>

            {tab === "unlock" && <Unlock />}
            {tab === "upgrade" && <Upgrade />}
            {tab === "sell" && <Sell />}

          </Flex>
        </ScrollArea>
      </Card>
    </FullscreenModal>
  )
}

export default BlacksmithModal

function Unlock() {
  const player = useApiStore(state => state.player);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selected = player && selectedId ? player.items[selectedId] : undefined;

  const items = player ? Object.values(player.items).filter(i => i.id === "ot_item_box") : undefined;

  const onUnlock = () => {
    let item: IItem | undefined = undefined;

    useApiStore.setState(s => {
      if (!s.player) return;
      if (!selectedId) return;
      item = game.actions.blacksmithUnlock.act(s.player, { itemId: selectedId });
    });

    if (!item) return;

    useAppStore.setState(s => {
      s.modals.contentList = { opened: true, contents: [{ item }] };
    });
  }

  const canUnlock = (): boolean => {
    if (!player) return false;
    if (!selectedId) return false;
    return game.actions.blacksmithUnlock.actable(player, { itemId: selectedId });
  }

  const onSelectItem = (itemId: string) => {
    setSelectedId(itemId);
  }

  const onDeselectItem = () => {
    setSelectedId(undefined);
  }

  return (
    <>
      <Divider label="Unlock Items" />

      <Flex direction="column" align="center" gap="md">
        <Content
          item={selected}
          onClick={onDeselectItem}
        />

        <Button onClick={onUnlock} disabled={!canUnlock()}>Unlock</Button>
      </Flex>

      <Divider label="Item Boxes" />

      <ContentList>
        {items?.map(i =>
          <Content
            key={game.item.id(i)}
            item={selectedId !== game.item.id(i) ? i : undefined}
            onClick={() => onSelectItem(game.item.id(i))} />
        )}
      </ContentList>
    </>
  )
}

function Upgrade() {
  const player = useApiStore(state => state.player);

  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const selectedItem = player && selectedItemId ? player.items[selectedItemId] : undefined;
  const upgradedItem = selectedItem ? game.item.getUpgradedItem(selectedItem) : undefined;

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
    <>
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
        {items?.map(i =>
          <Content
            key={game.item.id(i)}
            item={selectedItemId !== game.item.id(i) ? i : undefined}
            onClick={() => onSelectItem(game.item.id(i))}
          />
        )}
      </ContentList>
    </>
  )
}

function Sell() {
  const player = useApiStore(state => state.player);
  const items = player ? Object.values(player.items) : undefined;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedItems = player ? selectedIds.map(id => id ? player.items[id] : undefined).filter(Boolean) as IItem[] : undefined;
  const sellRewards = selectedItems ? game.item.getSellRewards(selectedItems) : [];

  const onSell = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      if (!selectedItems) return;
      const acted = game.actions.blacksmithSell.act(s.player, { items: selectedIds });
      if (acted) setSelectedIds([]);
    });
  }

  const canSell = (): boolean => {
    if (!player) return false;
    if (!selectedItems) return false;
    return game.actions.blacksmithSell.actable(player, { items: selectedIds });
  }

  const onSelectItem = (itemId: string) => {
    // Check if the same item id is already selected
    if (selectedIds.filter(id => id === itemId).length > 0) return;

    setSelectedIds([...selectedIds, itemId]);
  }

  const onDeselectItem = (index: number) => {
    const newIds = [...selectedIds];
    newIds.splice(index, 1);

    setSelectedIds(newIds);
  }

  return (
    <>
      <Divider label="Sell Items" />

      <Flex direction="column" style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <ScrollArea scrollbars="x">
          <Flex justify="center" gap="xs">

            {selectedIds.length === 0 && <Content placeholder={assets.item("we_ancient_sword").image} />}

            {selectedItems?.map((item, i) =>
              <Content
                key={game.item.id(item)}
                item={item}
                onClick={() => onDeselectItem(i)}
              />
            )}

          </Flex>
        </ScrollArea>
      </Flex>

      <Flex justify="center">
        <Button onClick={onSell} disabled={!canSell()} variant="light" color="red">Sell & Receive</Button>
      </Flex>

      <Flex direction="column" style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <ScrollArea scrollbars="x">
          <Flex justify="center" gap="xs">

            {sellRewards?.map(c =>
              c.item ?
                <Content key={game.item.id(c.item)} item={c.item} />
                :
                <Content key={game.monster.id(c.monster!)} monster={c.monster} />
            )}

          </Flex>
        </ScrollArea>
      </Flex>

      <Divider label="Items" />

      <ContentList>
        {items?.map(i =>
          <Content
            key={game.item.id(i)}
            item={!selectedIds.includes(game.item.id(i)) ? i : undefined}
            onClick={() => onSelectItem(game.item.id(i))}
          />
        )}
      </ContentList>
    </>
  )
}