import RouteButton from "@/components/buttons/RouteButton"
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { Divider, Flex, Progress, ScrollArea, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import DailyQuestsModal from "./events/DailyQuestsModal";

function Events() {
  const [dailyQuestsOpened, { open: openDailyQuests, close: closeDailyQuests }] = useDisclosure();

  const player = useApiStore(state => state.player);

  const dailyQuestsDone = player ? game.dailyQuest.getDoneAll(player) : 0;
  const dailyQuestsTodo = game.dailyQuest.getTodoAll();

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

          <RouteButton emoji="🎯" title="Achievements" onClick={() => { }}>
            <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
          </RouteButton>

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
    </>
  )
}

export default Events