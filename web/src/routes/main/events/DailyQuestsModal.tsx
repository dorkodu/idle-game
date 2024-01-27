import ResourceButton from "@/components/buttons/ResourceButton";
import CollectableRewardCard, { CollectableRewardCardProps } from "@/components/cards/CollectableRewardCard";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useTimer } from "@/components/hooks";
import { useApiStore } from "@/stores/apiStore";
import { IDailyQuest } from "@game/core/daily_quest";
import { DailyQuestId } from "@game/data/daily_quests";
import { dailyQuest, game } from "@game/index";
import { Divider, Flex, Progress, ScrollArea, Title } from "@mantine/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function DailyQuestsModal({ opened, onClose }: ModalProps) {
  const { t } = useTranslation();

  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const gem = player?.items[game.constants.gemId]?.count ?? 0;

  const dailyQuestsDone = player ? game.dailyQuest.getDoneAll(player) : 0;
  const dailyQuestsTodo = game.dailyQuest.getTodoAll();

  const resetDate = player ? game.dailyQuest.getResetDate(player.events.dailyQuests.startDate) : Date.now();
  const time = useTimer(
    resetDate,
    () => {
      useApiStore.setState(s => {
        if (!s.player) return;
        game.actions.resetDailyQuests.act(s.player, {});
      });
    }
  );

  const dailyQuests = useMemo((): CollectableRewardCardProps[] => {
    if (!player) return [];
    return (Object.keys(game.dailyQuests) as DailyQuestId[])
      .map((dailyQuestId) => {
        const dailyQuest: IDailyQuest = { id: dailyQuestId };
        return {
          name: t(dailyQuest.id),
          rewards: game.dailyQuests[dailyQuest.id].rewards,
          done: player ? game.dailyQuest.getDone(player, dailyQuest) : 0,
          todo: game.dailyQuest.getTodo(dailyQuest),
          onCollect() {
            useApiStore.setState(s => {
              if (!s.player) return;
              game.actions.collectDailyQuest.act(s.player, { dailyQuestId: dailyQuest.id });
            });
          },
          collectible: game.actions.collectDailyQuest.actable(player, { dailyQuestId: dailyQuest.id }),
          collected: !!player?.events.dailyQuests.collected[dailyQuest.id],
        }
      })
      .sort((a, b) => a.collectible || b.collected ? -1 : 0)
  }, [player]);

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

          {dailyQuests.map(dailyQuest => <CollectableRewardCard key={dailyQuest.name} {...dailyQuest} />)}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default DailyQuestsModal