import RouteButton from "@/components/buttons/RouteButton"
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { Divider, Flex, Progress, ScrollArea, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

function Events() {
  const [dailyQuestsOpened, { open: openDailyQuests, close: closeDailyQuests }] = useDisclosure();
  const [achievementsOpened, { open: openAchievements, close: closeAchievements }] = useDisclosure();

  const player = useApiStore(state => state.player);
  const dailyQuestsDone = player?.events.dailyQuests.done ?? 0;
  const dailyQuestsTodo = player?.events.dailyQuests.todo ?? 0;

  return (
    <>
      <ScrollArea>
        <Flex direction="column" gap="md">

          <Divider label="Continuous Events" />

          <RouteButton emoji="📜" title="Daily Quests" onClick={openDailyQuests}>
            <Progress.Root size="xl" mt="xs" w="100%">
              <Progress.Section value={(dailyQuestsDone / dailyQuestsTodo) * 100}>
                <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                  {`${dailyQuestsDone} / ${dailyQuestsTodo}`}
                </Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </RouteButton>

          <RouteButton emoji="🎯" title="Achievements" onClick={openAchievements} />

          <Divider label="Limited Events" />

          <RouteButton emoji="😈" title="Monster Hunt" onClick={() => { }}>
            <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
          </RouteButton>

          <RouteButton emoji="💳" title="Spending Spree" onClick={() => { }}>
            <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
          </RouteButton>

        </Flex>
      </ScrollArea>

      <DailyQuestsModal opened={dailyQuestsOpened} onClose={closeDailyQuests} />
      <AchievementsModal opened={achievementsOpened} onClose={closeAchievements} />
    </>
  )
}

export default Events

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function DailyQuestsModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      Daily Quests
    </FullscreenModal>
  )
}

function AchievementsModal({ opened, onClose }: ModalProps) {
  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      Achievements
    </FullscreenModal>
  )
}