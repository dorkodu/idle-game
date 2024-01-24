import Emoji from "@/components/Emoji";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { MonsterLineup } from "@game/types/lineup";
import { Button, Card, Divider, Flex, ScrollArea, Text, Title } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function ArenaModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const arenaTrophy = player?.items[game.constants.arenaTrophyId]?.count ?? 0;

  const onResetBattles = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.resetArenaBattles.act(s.player, {});
    });
  }

  const canResetBattles = () => {
    if (!player) return false;
    return game.actions.resetArenaBattles.actable(player, {});
  }

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🏆" count={arenaTrophy} />}
    >
      <ScrollArea h="100%">
        <Flex direction="column" gap="md" h="100%">

          <Divider label="Arena" />

          <Flex direction="column" align="center" gap="md">
            <Emoji emoji="🏟" size={100} />

            <Button onClick={onResetBattles} disabled={!canResetBattles()}>Reset Battles</Button>
          </Flex>

          {player?.map.arena.dates.map(date => <ArenaItem key={date} date={date} />)}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default ArenaModal

function ArenaItem({ date }: { date: number }) {
  const player = useApiStore(state => state.player);

  const enemies = player ? Object.values(game.battles.arena.getLineup(player, { date })).filter(Boolean) as IMonster[] : undefined
  const rewards = player ? game.battles.arena.getRewards(player, { date }) : undefined;

  const lineupPower = game.lineup.getPower(enemies as MonsterLineup);
  const arenaTrophy = rewards?.filter(reward => reward.item && reward.item.id === "ot_arena_trophy")[0]?.item?.count ?? 0;

  const onBattle = () => {
    const player = useApiStore.getState().player;
    if (!player) return;

    useAppStore.setState(s => {
      s.modals.lineup = { opened: true, battleId: "arena" }
    });
  }

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap="md">

        <Flex justify="space-between">
          <Flex align="center" gap="xs">
            <Emoji emoji="⚡" />
            <Title order={5}>{util.formatNumber(lineupPower)}</Title>
          </Flex>

          <Flex align="center" gap="xs">
            <Emoji emoji="🏆" />
            <Title order={5} c="green">{`+${arenaTrophy}`}</Title>
            <Text>{"|"}</Text>
            <Emoji emoji="🏆" />
            <Title order={5} c="red">{`-${arenaTrophy}`}</Title>
          </Flex>
        </Flex>

        <Flex style={{ display: "grid", gridTemplateColumns: "auto" }}>
          <ScrollArea>
            <Flex gap="xs">
              {enemies?.map(m => <Content key={game.monster.id(m)} monster={m} />)}
            </Flex>
          </ScrollArea>
        </Flex>

        <Button onClick={onBattle}>Battle</Button>

      </Flex>
    </Card>
  )
}