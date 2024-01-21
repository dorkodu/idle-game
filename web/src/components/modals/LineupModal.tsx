import { useAppStore } from "@/stores/appStore";
import { Button, Divider, Flex, Modal, Title } from "@mantine/core";
import Content from "../custom/Content";
import Emoji from "../Emoji";
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";

function LineupModal() {
  const lineup = useAppStore(state => state.modals.lineup);
  const close = () => useAppStore.setState(s => { s.modals.lineup.opened = false });

  const player = useApiStore(s => s.player);

  const onItemList = (index: number) => {
    const player = useApiStore.getState().player;
    if (!player) return;

    const _monsters = player.monsters;
    const monsters = _monsters && Object.values(_monsters) || [];

    const availableMonsters = monsters.filter(m => !player.lineup.includes(game.monster.id(m)));
    const currentMonster = player.lineup[index];

    useAppStore.setState(s => {
      s.modals.contentList = {
        opened: true,
        contents: availableMonsters.map(m => ({ monster: m })),
        onClick: (id) => changeLineup(id, index),
        removeable: !!player?.lineup[index],
        onRemove: () => changeLineup(undefined, index),
        notice: !currentMonster && availableMonsters.length === 0 ? "No monsters to select." : undefined,
      }
    });
  }

  const onBattle = () => {
    if (!lineup.battle) return;

    let shouldClose = false;

    useAppStore.setState(s => {
      const player = useApiStore.getState().player;
      let actable = false;

      useApiStore.setState(s => {
        if (!s.player) return;

        switch (lineup.battle?.type) {
          case "campaign":
            actable = game.actions.campaignBattle.actable(s.player, {});
            if (actable) {
              game.actions.campaignBattle.act(s.player, {});
              shouldClose = true;
            }
            break;
          case "tower":
            actable = game.actions.towerBattle.actable(s.player, {});
            if (actable) {
              game.actions.towerBattle.act(s.player, {});
              shouldClose = true;
            }
            break;
          default: break;
        }
      });

      if (!player || !actable) return;

      s.modals.battle = {
        opened: true,
        speed: s.modals.battle.speed,
        battle: lineup.battle,
      }
    });

    if (shouldClose) close();
  }

  const changeLineup = (monster: string | undefined, index: number) => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.changeLineup.act(s.player, { monster, index });
    });
  }

  return (
    <Modal
      opened={lineup.opened} onClose={close}
      centered lockScroll={false} size={360}
      title="Lineup" zIndex={1000}
    >
      <Flex direction="column">
        <Flex align="center" gap="xs">
          <Emoji emoji="⚡" />
          <Title order={5}>{util.formatNumber(game.lineup.getPower(game.player.getMonsterLineup(player)))}</Title>
        </Flex>

        <Flex direction="column" align="center">
          <Divider w="100%" label="Front" my="xs" />
          <Flex gap="xs">
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[0])} onClick={() => onItemList(0)} />
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[1])} onClick={() => onItemList(1)} />
          </Flex>
        </Flex>

        <Flex direction="column" align="center">
          <Divider w="100%" label="Back" my="xs" />
          <Flex gap="xs">
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[2])} onClick={() => onItemList(2)} />
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[3])} onClick={() => onItemList(3)} />
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[4])} onClick={() => onItemList(4)} />
            <Content monster={game.player.getMonsterById(player, player?.lineup?.[5])} onClick={() => onItemList(5)} />
          </Flex>
        </Flex>

        <Button onClick={onBattle} mt="md">Battle</Button>

      </Flex>
    </Modal>
  )
}

export default LineupModal