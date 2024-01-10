import Emoji from "@/components/Emoji"
import TierBadge from "@/components/custom/TierBadge"
import { ActionIcon, Button, Card, Flex, Image, Progress, Text } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

function Campaign() {
  return (
    <Flex direction="column" align="center" justify="center" gap="md" h="100%">

      <Flex align="center" pos="relative">

        <Flex pr="xs" pos="absolute" right="100%">
          <ActionIcon radius="xl" size={32}>
            <IconSearch />
          </ActionIcon>
        </Flex>

        <Flex maw={120} style={{ wordBreak: "break-word" }}>
          <Text fz="lg" fw="bold" ta="center" lineClamp={3}>Tree of Life</Text>
        </Flex>

        <Flex pl="xs" pos="absolute" left="100%">
          <TierBadge tier="S" />
        </Flex>

      </Flex>

      <Image
        src="" w={100} h={100} draggable={false}
        style={{ imageRendering: "pixelated", flex: "unset" }}
      />

      <Flex direction="column" justify="center" pos="relative" w="100%" maw={100}>
        <Progress value={(3 / 10) * 100} size="lg" />
        <Text size="sm" pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
          {`${3} / ${10}`}
        </Text>
      </Flex>

      <Button size="md">Battle</Button>

      <Card withBorder p={0} w="100%" maw={300}>
        <Button.Group>

          <Flex align="center" px="xs" style={{ flex: 1 }}>
            <Flex w="100%">
              <Emoji emoji="🪙" size={20} />
              <Text size="sm" w="100%">123K</Text>
            </Flex>
            <Flex w="100%">
              <Emoji emoji="🍏" size={20} />
              <Text size="sm">123K</Text>
            </Flex>
            <Flex w="100%">
              <Emoji emoji="⭐" size={20} />
              <Text size="sm">123K</Text>
            </Flex>
            <Flex>
              <Emoji emoji="📦" size={20} />
            </Flex>
          </Flex>

          <Button>Get</Button>

        </Button.Group>
      </Card>

    </Flex>
  )
}

export default Campaign