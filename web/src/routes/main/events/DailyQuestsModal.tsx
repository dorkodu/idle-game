import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { IDailyQuest } from "@game/core/daily_quest";
import { DailyQuestId } from "@game/data/daily_quests";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, Progress, ScrollArea, Title } from "@mantine/core";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function DailyQuestsModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const gem = player?.items[game.constants.gemId]?.count ?? 0;

  const dailyQuestsDone = player ? game.dailyQuest.getDoneAll(player) : 0;
  const dailyQuestsTodo = game.dailyQuest.getTodoAll();

  const [time, setTime] = useState("00:00:00")
  useEffect(() => {
    const callback = () => {
      const player = useApiStore.getState().player;
      if (!player) return;

      const currentDate = new Date();
      const nextDate = new Date(game.dailyQuest.getResetDate(Date.now()));

      const _hour = Math.abs(nextDate.getUTCHours() - currentDate.getUTCHours());
      const _minute = Math.abs(nextDate.getUTCMinutes() - currentDate.getUTCMinutes());
      const _second = Math.abs(nextDate.getUTCSeconds() - currentDate.getUTCSeconds());

      const hour = _hour > 9 ? _hour : `0${_hour}`;
      const minute = _minute > 9 ? _minute : `0${_minute}`;
      const second = _second > 9 ? _second : `0${_second}`;

      setTime(`${hour}:${minute}:${second}`);
    }

    const interval = setInterval(callback, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={
        <>
          <ResourceButton emoji="🪙" count={gold} />
          <ResourceButton emoji="💎" count={gem} />
        </>
      }
    >
      <ScrollArea h="100%">
        <Flex direction="column" gap="md" h="100%">

          <Divider label="Daily Quests" />

          <Progress.Root size={24} w="100%">
            <Progress.Section value={(dailyQuestsDone / dailyQuestsTodo) * 100}>
              <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                {`${dailyQuestsDone} / ${dailyQuestsTodo}`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <Title order={6} ta="center">Resets in {time}</Title>

          {(Object.keys(game.dailyQuests) as DailyQuestId[]).map(dailyQuestId =>
            <DailyQuest key={dailyQuestId} dailyQuest={{ id: dailyQuestId }} />
          )}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default DailyQuestsModal

function DailyQuest({ dailyQuest }: { dailyQuest: IDailyQuest }) {
  const player = useApiStore(state => state.player);

  const rewards = game.dailyQuests[dailyQuest.id].rewards;
  const done = player ? game.dailyQuest.getDone(player, dailyQuest) : 0;
  const todo = game.dailyQuest.getTodo(dailyQuest);
  const collected = !!player?.events.dailyQuests.collected[dailyQuest.id];

  const canCollect = (): boolean => {
    if (!player) return false;
    return game.actions.collectDailyQuest.actable(player, { dailyQuestId: dailyQuest.id });
  }

  const onCollect = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.collectDailyQuest.act(s.player, { dailyQuestId: dailyQuest.id });
    });
  }

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap="xs">
        <Title order={6}>{dailyQuest.id}</Title>

        <ScrollArea>
          <Flex gap="xs">
            {rewards.map(c =>
              c.item ?
                <Content key={game.item.id(c.item)} item={c.item} />
                :
                <Content key={game.monster.id(c.monster!)} monster={c.monster} />
            )}
          </Flex>
        </ScrollArea>

        <Flex gap="md" align="center">
          <Progress.Root size="xl" style={{ flex: 1 }}>
            <Progress.Section value={(done / todo) * 100}>
              <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                {`${done} / ${todo}`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <Button
            onClick={onCollect} disabled={!canCollect()}
            leftSection={collected ? <IconCircleCheck /> : <IconCircle />}
          >
            Collect
          </Button>
        </Flex>

      </Flex>
    </Card>
  )
}