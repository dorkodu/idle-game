import { Button, Card, Flex, Progress, ScrollArea, Title } from "@mantine/core";
import Content from "../custom/Content";
import { game } from "@game/index";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { IContent } from "@game/types/content";

export interface CollectableRewardCardProps {
  name: string;
  rewards: IContent[];
  done: number;
  todo: number;
  onCollect: () => void;
  collectible: boolean
  collected: boolean;
}

function CollectableRewardCard({ name, rewards, done, todo, onCollect, collectible, collected }: CollectableRewardCardProps) {
  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap="xs">
        <Title order={6}>{name}</Title>

        <ScrollArea>
          <Flex gap="xs">
            {rewards.map(c =>
              c.item ?
                <Content key={game.item.id(c.item)} item={c.item} />
                :
                <Content key={game.monster.id(c.monster!)} monster={c.monster} />
            )}
          </Flex>
        </ScrollArea>

        <Flex gap="md" align="center">
          <Progress.Root size="xl" style={{ flex: 1 }}>
            <Progress.Section value={(done / todo) * 100}>
              <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                {`${done} / ${todo}`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <Button
            onClick={onCollect} disabled={!collectible}
            leftSection={collected ? <IconCircleCheck /> : <IconCircle />}
          >
            Collect
          </Button>
        </Flex>

      </Flex>
    </Card>
  )
}

export default CollectableRewardCard