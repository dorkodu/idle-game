import RouteButton from "@/components/buttons/RouteButton"
import { Divider, Flex, ScrollArea } from "@mantine/core"

function Events() {
  return (
    <ScrollArea>
      <Flex direction="column" gap="md">

        <Divider label="Continuous Events" />
        <RouteButton emoji="📜" title="Daily Quests" onClick={() => { }} />
        <RouteButton emoji="🎯" title="Achievements" onClick={() => { }} />

        <Divider label="Limited Events" />
        <RouteButton emoji="💳" title="Spending Spree" onClick={() => { }} />

      </Flex>
    </ScrollArea>
  )
}

export default Events