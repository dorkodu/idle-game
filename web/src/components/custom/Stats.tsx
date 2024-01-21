import { IStats } from "@game/core/stats";
import { ActionIcon, Card, Flex, Text, Title } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";
import Emoji from "../Emoji";
import { util } from "@/lib/util";
import { game } from "@game/index";

interface Props {
  stats: IStats;
}

function Stats({ stats }: Props) {
  return (
    <Flex direction="column" w="100%">
      <Text size="sm">Stats:</Text>

      <Card withBorder style={{ overflow: "visible" }}>
        <Flex gap="xs">

          <ActionIcon size={24} radius="xl" pos="absolute" top={-12} right={-12}>
            <IconQuestionMark />
          </ActionIcon>

          <Card withBorder style={{ flex: 1 }}>
            <Flex direction="column" align="center">
              <Emoji emoji="❤" style={{ width: 24, height: 24 }} />
              <Title order={5}>{util.formatNumber(game.stats.value(stats.health))}</Title>
            </Flex>
          </Card>

          <Card withBorder style={{ flex: 1 }}>
            <Flex direction="column" align="center">
              <Emoji emoji="⚔" style={{ width: 24, height: 24 }} />
              <Title order={5}>{util.formatNumber(game.stats.value(stats.damage))}</Title>
            </Flex>
          </Card>

          <Card withBorder style={{ flex: 1 }}>
            <Flex direction="column" align="center">
              <Emoji emoji="👟" style={{ width: 24, height: 24 }} />
              <Title order={5}>{util.formatNumber(game.stats.value(stats.speed))}</Title>
            </Flex>
          </Card>

        </Flex>
      </Card>
    </Flex>
  )
}

export default Stats