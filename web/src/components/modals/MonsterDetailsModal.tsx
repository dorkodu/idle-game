import { useAppStore } from "@/stores/appStore";
import { ActionIcon, Button, Card, Flex, Image, Modal, Text, Title, useMantineTheme } from "@mantine/core";
import { IconArrowBigLeftFilled, IconArrowBigRightFilled, IconArrowBigUpFilled, IconArrowLeft } from "@tabler/icons-react";
import ResourceButton from "../buttons/ResourceButton";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import Stars from "../custom/Stars";
import { assets } from "@/assets/assets";
import Emoji from "../Emoji";
import { useState } from "react";
import { IMonster } from "@game/core/monster";
import { util } from "@/lib/util";
import Content from "../custom/Content";
import { ItemTypeEquipment } from "@game/types/item_type";
import Stats from "../custom/Stats";

function MonsterDetailsModal() {
  const monsterDetails = useAppStore(state => state.modals.monsterDetails);
  const close = () => useAppStore.setState(s => { s.modals.monsterDetails.opened = false });

  const theme = useMantineTheme();

  const [tab, setTab] = useState<"stats" | "items">("stats");

  const player = useApiStore(state => state.player);

  const monsterId = monsterDetails.monsterId;
  const monster = player && monsterId && player?.monsters[monsterId];

  const gold = player?.items[game.constants.goldId]?.count;
  const food = player?.items[game.constants.foodId]?.count;

  const onChange = (offset: number) => {
    const monsterId = monsterDetails.monsterId;
    if (!monsterId) return;

    const _monsters = useApiStore.getState().player?.monsters;
    if (!_monsters) return;

    const monsters = Object.keys(_monsters);

    let index = monsters.findIndex(m => monsterId === m);
    if (index === -1) return;

    index += offset;
    if (index >= monsters.length) index = 0;
    else if (index < 0) index = monsters.length - 1;

    useAppStore.setState(s => { s.modals.monsterDetails.monsterId = monsters[index] });
  }

  return (
    <Modal
      opened={monsterDetails.opened} onClose={close}
      withCloseButton={false} fullScreen
      styles={{ body: { height: "100%" } }} radius={0}
    >
      <Flex
        direction="column" justify="center"
        mx="auto" maw={theme.breakpoints.xs} h="100%" pos="relative"
      >

        <Flex align="center" justify="space-between" gap="md" pos="absolute" top={0} left={0} right={0} h={32}>
          <ActionIcon radius="xl" size={32} onClick={close}>
            <IconArrowLeft />
          </ActionIcon>

          <Flex justify="end" gap="xs" w="100%">
            <ResourceButton emoji="🪙" count={gold} />
            <ResourceButton emoji="🍏" count={food} />
          </Flex>
        </Flex>

        {monster &&
          <Flex direction="column" gap="xl" mx="auto" mt={48} w="100%" maw={360}>

            <Flex direction="column" align="center" gap="xs">
              <Title order={5}>{monster.id}</Title>

              <Flex gap={5}>
                <Stars stars={monster.stars} size={16} />
              </Flex>

              <Flex align="center" justify="center" gap="md">
                <ActionIcon onClick={() => onChange(-1)} variant="transparent" radius="xl" size={32} c="var(--text-color)">
                  <IconArrowBigLeftFilled />
                </ActionIcon>

                <Image
                  src={assets.monster(monster.id)} w={100} h={100}
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                />

                <ActionIcon onClick={() => onChange(+1)} variant="transparent" radius="xl" size={32} c="var(--text-color)">
                  <IconArrowBigRightFilled />
                </ActionIcon>
              </Flex>
            </Flex>

            <Card withBorder h={360} radius="md" style={{ overflow: "visible" }}>

              <Flex gap="xs" pos="absolute" mt={-36} style={{ left: "50%", transform: "translate(-50%,0)" }}>
                <ActionIcon variant={tab !== "stats" ? "default" : undefined} radius="xl" size={40} onClick={() => setTab("stats")}>
                  <Emoji emoji="📊" size={20} />
                </ActionIcon>
                <ActionIcon variant={tab !== "items" ? "default" : undefined} radius="xl" size={40} onClick={() => setTab("items")}>
                  <Emoji emoji="⚔" size={20} />
                </ActionIcon>
              </Flex>

              {tab === "stats" && <StatsSection monster={monster} />}
              {tab === "items" && <ItemsSection monster={monster} />}

            </Card>

          </Flex>
        }

      </Flex>
    </Modal>
  )
}

interface Props {
  monster: IMonster;
}

function StatsSection({ monster }: Props) {
  const player = useApiStore(state => state.player);

  const cost = game.monster.getLevelUpCost(monster);
  const stats = game.monster.getStats(monster);
  const power = game.monster.getPower(monster);

  const canUpgrade = player && game.actions.levelupMonster.actable(player, { monster: game.monster.id(monster) });
  const lowGold = player ? (player.items[game.constants.goldId]?.count ?? 0) < cost.gold : true;
  const lowFood = player ? (player.items[game.constants.foodId]?.count ?? 0) < cost.food : true;

  const onUpgrade = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.levelupMonster.act(s.player, { monster: game.monster.id(monster) });
    });
  }

  return (
    <Flex direction="column" gap="xs" h="100%">

      <Flex justify="space-between">
        <Flex align="center" gap="xs">
          <Emoji emoji="⚡" />
          <Title order={5}>{util.formatNumber(power)}</Title>
        </Flex>
        <Text>{`Level: ${monster?.level}`}</Text>
      </Flex>

      <Flex direction="column">
        <Text size="sm">Level Up:</Text>

        <Flex justify="space-between" gap="xs">
          <Card withBorder p={5} style={{ flex: 1 }}>
            <Flex align="center">
              <Flex style={{ flex: 1 }} c={lowGold ? "red" : undefined}>
                <Emoji emoji="🪙" size={24} />
                &nbsp;
                <Text fw="bold">{util.formatNumber(cost.gold)}</Text>
              </Flex>

              <Flex style={{ flex: 1 }} c={lowFood ? "red" : undefined}>
                <Emoji emoji="🍏" size={24} />
                &nbsp;
                <Text fw="bold">{util.formatNumber(cost.food)}</Text>
              </Flex>
            </Flex>
          </Card>

          <Button variant="filled" onClick={onUpgrade} disabled={!canUpgrade}>
            <IconArrowBigUpFilled />
          </Button>
        </Flex>
      </Flex>

      <Stats stats={stats} />

      <Flex gap="xs" align="center" justify="center" style={{ flex: 1 }}>
        <ActionIcon radius="xl" w={48} h={48}>X</ActionIcon>
        <ActionIcon radius="xl" w={48} h={48}>X</ActionIcon>
        <ActionIcon radius="xl" w={48} h={48}>X</ActionIcon>
        <ActionIcon radius="xl" w={48} h={48}>X</ActionIcon>
      </Flex>

    </Flex>
  )
}

function ItemsSection({ monster }: Props) {
  const onClick = (type: ItemTypeEquipment) => {
    const player = useApiStore.getState().player;

    useAppStore.setState(s => {
      if (!player) return;

      const items = game.player.getItemsByType(player, type);

      const hasItems = items.length > 0;
      const hasEquipped = !!monster.items?.[type];

      s.modals.contentList = {
        opened: true,
        contents: items.map(item => ({ item })),
        onClick: equip,
        removeable: hasEquipped,
        onRemove: () => { unequip(type) },
        notice: !hasItems && !hasEquipped ? "No items to equip." : undefined,
      };
    });
  }

  const equip = (id: string) => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.equipItem.act(s.player, { item: id, monster: game.monster.id(monster) })
    });

    // Close the content list modal as it was open while equiping the item
    useAppStore.setState(s => { s.modals.contentList.opened = false });
  }

  const unequip = (type: ItemTypeEquipment) => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.unequipItem.act(s.player, { type, monster: game.monster.id(monster) })
    });

    // Close the content list modal as it was open while unequiping the item
    useAppStore.setState(s => { s.modals.contentList.opened = false });
  }

  const autoEquip = () => {
    const monsterId = game.monster.id(monster);

    useApiStore.setState(s => {
      if (!s.player) return;

      // Un-equip all the items first, then find the best items to equip
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "weapon" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "armor" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "amulet" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "rune" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "ring" });

      let weapon = game.player.getBestItem(s.player, "weapon");
      let armor = game.player.getBestItem(s.player, "armor");
      let amulet = game.player.getBestItem(s.player, "amulet");
      let rune = game.player.getBestItem(s.player, "rune");
      let ring = game.player.getBestItem(s.player, "ring");

      if (weapon) game.actions.equipItem.act(s.player, { monster: monsterId, item: game.item.id(weapon) });
      if (armor) game.actions.equipItem.act(s.player, { monster: monsterId, item: game.item.id(armor) });
      if (amulet) game.actions.equipItem.act(s.player, { monster: monsterId, item: game.item.id(amulet) });
      if (rune) game.actions.equipItem.act(s.player, { monster: monsterId, item: game.item.id(rune) });
      if (ring) game.actions.equipItem.act(s.player, { monster: monsterId, item: game.item.id(ring) });
    });
  }

  const unequipAll = () => {
    const monsterId = game.monster.id(monster);

    useApiStore.setState(s => {
      if (!s.player) return;

      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "weapon" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "armor" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "amulet" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "rune" });
      game.actions.unequipItem.act(s.player, { monster: monsterId, type: "ring" });
    });
  }

  return (
    <>
      <Flex direction="column" justify="center" gap="md" style={{ flex: 1 }}>
        <Flex justify="center">
          <Content onClick={() => onClick("weapon")} item={monster.items?.weapon} placeholder={assets.item("we_ancient_sword").image} hideCount />
        </Flex>
        <Flex justify="center" gap="xl">
          <Flex mr="xl">
            <Content onClick={() => onClick("armor")} item={monster.items?.armor} placeholder={assets.item("ar_animal_skin_1").image} hideCount />
          </Flex>
          <Flex ml="xl">
            <Content onClick={() => onClick("amulet")} item={monster.items?.amulet} placeholder={assets.item("am_bone_gray").image} hideCount />
          </Flex>
        </Flex>
        <Flex justify="center" gap="xl">
          <Content onClick={() => onClick("rune")} item={monster.items?.rune} placeholder={assets.item("ru_generic").image} hideCount />
          <Content onClick={() => onClick("ring")} item={monster.items?.ring} placeholder={assets.item("ri_agate").image} hideCount />
        </Flex>
      </Flex>

      <Flex gap="xs">
        <Button onClick={autoEquip} fullWidth>Auto Equip</Button>
        <Button onClick={unequipAll} fullWidth color="red">Unequip All</Button>
      </Flex>
    </>
  )
}

export default MonsterDetailsModal