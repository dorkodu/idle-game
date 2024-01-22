import { useAppStore } from "@/stores/appStore";
import { Button, Divider, Flex, Modal, Title } from "@mantine/core";
import Content from "../custom/Content";
import Emoji from "../Emoji";
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { IBattle } from "@game/core/battle";

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
    let actable = false;
    let battle: IBattle | undefined = undefined;

    useApiStore.setState(s => {
      if (!s.player) return;
      if (!lineup.battleId) return;

      actable = game.actions.performBattle.actable(s.player, { battleId: lineup.battleId });
      if (actable) {
        game.actions.performBattle.act(s.player, { battleId: lineup.battleId });
        battle = game.battles[lineup.battleId].onCreate(s.player);
      }
    });

    useAppStore.setState(s => {
      if (!actable || !battle) return;

      s.modals.battle = {
        opened: true,
        speed: s.modals.battle.speed,
        battle: battle,
      }
    });

    if (actable && battle) close();
  }

  const changeLineup = (monster: string | undefined, index: number) => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.changeLineup.act(s.player, { monster, index });
    });

    // Close the content list modal as it was open while changing the lineup
    useAppStore.setState(s => { s.modals.contentList.opened = false });
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
          <Title order={5}>{util.formatNumber(game.lineup.getPower(game.player.getLineup(player)))}</Title>
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