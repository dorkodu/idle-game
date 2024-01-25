import ResourceButton from "@/components/buttons/ResourceButton";
import CollectableRewardCard from "@/components/cards/CollectableRewardCard";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useTimer } from "@/components/hooks";
import { useApiStore } from "@/stores/apiStore";
import { DailyQuestId } from "@game/data/daily_quests";
import { game } from "@game/index";
import { Divider, Flex, Progress, ScrollArea, Title } from "@mantine/core";

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
            <CollectableRewardCard key={dailyQuestId} dailyQuest={{ id: dailyQuestId }} />
          )}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default DailyQuestsModal