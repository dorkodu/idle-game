import RouteButton from "@/components/buttons/RouteButton"
import { Flex, ScrollArea } from "@mantine/core"

function Map() {
  return (
    <ScrollArea>
      <Flex direction="column" gap="md">

        <RouteButton emoji="🗼" title="Tower" onClick={() => { }} />
        <RouteButton emoji="🏟" title="Arena" onClick={() => { }} />
        <RouteButton emoji="⚒" title="Blacksmith" onClick={() => { }} />
        <RouteButton emoji="🪦" title="Altar" onClick={() => { }} />

      </Flex>
    </ScrollArea>
  )
}

export default Map