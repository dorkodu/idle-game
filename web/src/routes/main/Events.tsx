import RouteButton from "@/components/buttons/RouteButton"
import { Divider, Flex, Progress, ScrollArea, Text } from "@mantine/core"

function Events() {
  return (
    <ScrollArea>
      <Flex direction="column" gap="md">

        <Divider label="Continuous Events" />

        <RouteButton emoji="📜" title="Daily Quests" onClick={() => { }}>
          <Progress value={0} mt="xs" w="100%" />
        </RouteButton>

        <RouteButton emoji="🎯" title="Achievements" onClick={() => { }} />

        <Divider label="Limited Events" />

        <RouteButton emoji="😈" title="Monster Hunt" onClick={() => { }}>
          <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
        </RouteButton>

        <RouteButton emoji="💳" title="Spending Spree" onClick={() => { }}>
          <Text ta="left" size="sm" c="yellow">Coming soon...</Text>
        </RouteButton>

      </Flex>
    </ScrollArea>
  )
}

export default Events