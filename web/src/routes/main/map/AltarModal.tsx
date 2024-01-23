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
  const food = player?.items[game.constants.foodId]?.count ?? 0;

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={
        <>
          <ResourceButton emoji="🪙" count={gold} />
          <ResourceButton emoji="🍏" count={food} />
        </>
      }
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

  const [selectedIds, setSelectedIds] = useState<[string?, string?, string?]>([undefined, undefined, undefined]);
  const selectedMonsters = player ? selectedIds.map(id => id ? player.monsters[id] : undefined) as [IMonster?, IMonster?, IMonster?] : undefined;
  const evolvedMonster = selectedMonsters ? game.monster.getEvolvedMonster(selectedMonsters) : undefined;;

  const onEvolve = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      if (selectedIds.filter(Boolean).length < 3) return;
      const acted = game.actions.altarEvolve.act(s.player, { monsters: selectedIds as [string, string, string] });
      if (acted) setSelectedIds([undefined, undefined, undefined]);
    });
  }

  const canEvolve = (): boolean => {
    if (!player) return false;
    if (selectedIds.filter(Boolean).length < 3) return false;
    return game.actions.altarEvolve.actable(player, { monsters: selectedIds as [string, string, string] });
  }

  const onSelectItem = (monsterId: string) => {
    // Check if the same monster id is already selected
    if (selectedIds.filter(id => id === monsterId).length > 0) return;

    // Find empty index in the selected ids array
    const index = selectedIds.findIndex((id) => id === undefined);
    if (index === -1) return;

    const newIds: typeof selectedIds = [...selectedIds];
    newIds.splice(index, 1, monsterId);
    setSelectedIds(newIds);
  }

  const onDeselectItem = (index: number) => {
    const newIds: typeof selectedIds = [...selectedIds];
    newIds[index] = undefined;

    setSelectedIds(newIds);
  }

  return (
    <>
      <Divider label="Evolve Monsters" />

      <Flex direction="column" align="center" gap="md">

        <Flex align="center" gap="xs">
          <Content
            placeholder={assets.monster("angel")}
            monster={selectedMonsters?.[0]}
            onClick={() => onDeselectItem(0)}
          />
          <Content
            placeholder={assets.monster("angel")}
            monster={selectedMonsters?.[1]}
            onClick={() => onDeselectItem(1)}
          />
          <Content
            placeholder={assets.monster("angel")}
            monster={selectedMonsters?.[2]}
            onClick={() => onDeselectItem(2)}
          />
        </Flex>
        <IconArrowBigDownFilled />
        <Content
          placeholder={assets.monster("death_knight")}
          monster={evolvedMonster}
        />

        <Button onClick={onEvolve} disabled={!canEvolve()}>Upgrade</Button>
      </Flex>

      <Divider label="Monsters" />

      <ContentList>
        {monsters?.map(m =>
          <Content
            key={game.monster.id(m)}
            monster={!selectedIds.includes(game.monster.id(m)) ? m : undefined}
            onClick={() => onSelectItem(game.monster.id(m))}
          />
        )}
      </ContentList>
    </>
  )
}

function Sacrifice() {
  const player = useApiStore(state => state.player);
  const monsters = player ? Object.values(player.monsters) : undefined;

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedMonsters = player ? selectedIds.map(id => id ? player.monsters[id] : undefined).filter(Boolean) as IMonster[] : undefined;
  const sacrificeRewards = selectedMonsters ? game.monster.getSacrificeRewards(selectedMonsters) : [];

  const onSacrifice = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      if (!selectedMonsters) return;
      const acted = game.actions.altarSacrifice.act(s.player, { monsters: selectedIds });
      if (acted) setSelectedIds([]);
    });
  }

  const canSacrifice = (): boolean => {
    if (!player) return false;
    if (!selectedMonsters) return false;
    return game.actions.altarSacrifice.actable(player, { monsters: selectedIds });
  }

  const onSelectItem = (monsterId: string) => {
    // Check if the same monster id is already selected
    if (selectedIds.filter(id => id === monsterId).length > 0) return;

    setSelectedIds([...selectedIds, monsterId]);
  }

  const onDeselectItem = (index: number) => {
    const newIds = [...selectedIds];
    newIds.splice(index, 1);

    setSelectedIds(newIds);
  }

  return (
    <>
      <Divider label="Sacrifice Monsters" />

      <Flex direction="column" style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <ScrollArea scrollbars="x">
          <Flex justify="center" gap="xs">

            {selectedIds.length === 0 && <Content placeholder={assets.monster("angel")} />}

            {selectedMonsters?.map((m, i) =>
              <Content
                key={game.monster.id(m)}
                monster={m}
                onClick={() => onDeselectItem(i)}
              />
            )}

          </Flex>
        </ScrollArea>
      </Flex>

      <Flex justify="center">
        <Button onClick={onSacrifice} disabled={!canSacrifice()} variant="light" color="red">Sacrifice & Receive</Button>
      </Flex>

      <Flex direction="column" style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <ScrollArea scrollbars="x">
          <Flex justify="center" gap="xs">

            {sacrificeRewards?.map(c =>
              c.item ?
                <Content key={game.item.id(c.item)} item={c.item} />
                :
                <Content key={game.monster.id(c.monster!)} monster={c.monster} />
            )}

          </Flex>
        </ScrollArea>
      </Flex>

      <Divider label="Monsters" />

      <ContentList>
        {monsters?.map(m =>
          <Content
            key={game.monster.id(m)}
            monster={!selectedIds.includes(game.monster.id(m)) ? m : undefined}
            onClick={() => onSelectItem(game.monster.id(m))}
          />
        )}
      </ContentList>
    </>
  )
}