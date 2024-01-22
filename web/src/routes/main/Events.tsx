import RouteButton from "@/components/buttons/RouteButton"
import { useApiStore } from "@/stores/apiStore";
import { Divider, Flex, Progress, ScrollArea, Text } from "@mantine/core"

function Events() {
  const player = useApiStore(state => state.player);
  const dailyQuestsDone = player?.events.dailyQuests.done ?? 0;
  const dailyQuestsTodo = player?.events.dailyQuests.todo ?? 0;

  return (
    <>
      <ScrollArea>
        <Flex direction="column" gap="md">

          <Divider label="Continuous Events" />

          <RouteButton emoji="📜" title="Daily Quests" onClick={() => { }}>
            <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
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
    </>
  )
}

export default Events