import { assets } from "@/assets/assets";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, ScrollArea } from "@mantine/core";
import { IconArrowBigDownFilled } from "@tabler/icons-react";
import { useState } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function AltarModal({ opened, onClose }: ModalProps) {
  const [tab, setTab] = useState<"summon" | "evolve" | "sacrifice">("summon");
  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🪙" count={gold} />}
    >
      <Card withBorder radius="md" h="100%">
        <ScrollArea scrollbars="y" h="100%">
          <Flex direction="column" gap="md" h="100%">

            <Button.Group mx="auto" w="100%" maw={360}>
              <Button fullWidth px={0} variant={tab !== "summon" ? "default" : undefined} onClick={() => setTab("summon")}>Summon</Button>
              <Button fullWidth px={0} variant={tab !== "evolve" ? "default" : undefined} onClick={() => setTab("evolve")}>Evolve</Button>
              <Button fullWidth px={0} variant={tab !== "sacrifice" ? "default" : undefined} onClick={() => setTab("sacrifice")}>Sacrifice</Button>
            </Button.Group>

            {tab === "summon" && <Summon />}
            {tab === "evolve" && <Evolve />}
            {tab === "sacrifice" && <Sacrifice />}

          </Flex>
        </ScrollArea>
      </Card>
    </FullscreenModal>
  )
}

export default AltarModal

function Summon() {
  const player = useApiStore(state => state.player);

  const [selectedScrollId, setSelectedItemId] = useState<string | undefined>(undefined);
  const selectedScroll = player && selectedScrollId ? player.items[selectedScrollId] : undefined;

  const items = player ? Object.values(player.items).filter(i => i.id === "ot_monster_scroll") : undefined;

  const onSummon = () => {
    let monster: IMonster | undefined = undefined;

    useApiStore.setState(s => {
      if (!s.player) return;
      if (!selectedScrollId) return;
      monster = game.actions.altarSummon.act(s.player, { itemId: selectedScrollId });
    });

    if (!monster) return;

    useAppStore.setState(s => {
      s.modals.contentList = { opened: true, contents: [{ monster }] };
    });
  }

  const canSummon = (): boolean => {
    if (!player) return false;
    if (!selectedScrollId) return false;
    return game.actions.altarSummon.actable(player, { itemId: selectedScrollId });
  }

  const onSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  }

  const onDeselectItem = () => {
    setSelectedItemId(undefined);
  }

  return (
    <>
      <Divider label="Summon Monsters" />

      <Flex direction="column" align="center" gap="md">
        <Content
          item={selectedScroll}
          onClick={onDeselectItem}
        />

        <Button onClick={onSummon} disabled={!canSummon()}>Summon</Button>
      </Flex>

      <Divider label="Monster Scrolls" />

      <ContentList>
        {items?.map(i => <Content key={game.item.id(i)} item={i} onClick={() => onSelectItem(game.item.id(i))} />)}
      </ContentList>
    </>
  )
}

function Evolve() {
  const player = useApiStore(state => state.player);
  const monsters = player ? Object.values(player.monsters) : undefined;

  return (
    <>
      <Divider label="Evolve Monsters" />

      <Flex direction="column" align="center" gap="md">

        <Flex align="center" gap="xs">
          <Content placeholder={assets.monster("angel")} />
          <Content placeholder={assets.monster("angel")} />
          <Content placeholder={assets.monster("angel")} />
        </Flex>
        <IconArrowBigDownFilled />
        <Content placeholder={assets.monster("death_knight")} />

        <Button>Upgrade</Button>
      </Flex>

      <Divider label="Monsters" />

      <ContentList>
        {monsters?.map(m => <Content key={game.monster.id(m)} monster={m} onClick={() => { }} />)}
      </ContentList>
    </>
  )
}

function Sacrifice() {
  const player = useApiStore(state => state.player);
  const monsters = player ? Object.values(player.monsters) : undefined;

  return (
    <>
      <Divider label="Sacrifice Monsters" />

      <ContentList>
        {monsters?.map(m => <Content key={game.monster.id(m)} monster={m} onClick={() => { }} />)}
      </ContentList>

      <Flex justify="center">
        <Button variant="light" color="red">Sacrifice</Button>
      </Flex>

      <Divider label="Monsters" />

      <ContentList>
        {monsters?.map(m => <Content key={game.monster.id(m)} monster={m} onClick={() => { }} />)}
      </ContentList>
    </>
  )
}