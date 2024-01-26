import { Button, Card, Flex, Progress, ScrollArea, Title } from "@mantine/core";
import Content from "../custom/Content";
import { game } from "@game/index";
import { IconCircle, IconCircleCheck } from "@tabler/icons-react";
import { IContent } from "@game/types/content";
import { IDailyQuest } from "@game/core/daily_quest";
import { useMemo } from "react";
import { useApiStore } from "@/stores/apiStore";
import { IAchievement } from "@game/core/achievement";
import { useTranslation } from "react-i18next";

interface Vars {
  name: string;
  rewards: IContent[];
  done: number;
  todo: number;
  onCollect: () => void;
  collectible: boolean
  collected: boolean;
}

interface Props {
  dailyQuest?: IDailyQuest;
  achievement?: IAchievement;
}

function CollectableRewardCard({ dailyQuest, achievement }: Props) {
  const { t } = useTranslation();

  const player = useApiStore(state => state.player);

  const vars = useMemo((): Vars | undefined => {
    if (!player) return undefined;

    if (dailyQuest) {
      return {
        name: t(dailyQuest.id),
        rewards: game.dailyQuests[dailyQuest.id].rewards,
        done: player ? game.dailyQuest.getDone(player, dailyQuest) : 0,
        todo: game.dailyQuest.getTodo(dailyQuest),
        onCollect() {
          useApiStore.setState(s => {
            if (!s.player) return;
            game.actions.collectDailyQuest.act(s.player, { dailyQuestId: dailyQuest.id });
          });
        },
        collectible: game.actions.collectDailyQuest.actable(player, { dailyQuestId: dailyQuest.id }),
        collected: !!player?.events.dailyQuests.collected[dailyQuest.id],
      }
    }
    else if (achievement) {
      return {
        name: t(achievement.id),
        rewards: game.achievements[achievement.id].rewards,
        done: player ? game.achievement.getDone(player, achievement) : 0,
        todo: game.achievement.getTodo(achievement),
        onCollect() {
          useApiStore.setState(s => {
            if (!s.player) return;
            game.actions.collectAchievement.act(s.player, { achievementId: achievement.id });
          });
        },
        collectible: game.actions.collectAchievement.actable(player, { achievementId: achievement.id }),
        collected: !!player?.events.achievements.collected[achievement.id],
      }
    }

    return undefined;
  }, [player, dailyQuest, achievement]);

  if (!vars) return null;
  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap="xs">
        <Title order={6}>{vars.name}</Title>

        <ScrollArea>
          <Flex gap="xs">
            {vars.rewards.map(c =>
              c.item ?
                <Content key={game.item.id(c.item)} item={c.item} />
                :
                <Content key={game.monster.id(c.monster!)} monster={c.monster} />
            )}
          </Flex>
        </ScrollArea>

        <Flex gap="md" align="center">
          <Progress.Root size="xl" style={{ flex: 1 }}>
            <Progress.Section value={(vars.done / vars.todo) * 100}>
              <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                {`${vars.done} / ${vars.todo}`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <Button
            onClick={vars.onCollect} disabled={!vars.collectible}
            leftSection={vars.collected ? <IconCircleCheck /> : <IconCircle />}
          >
            Collect
          </Button>
        </Flex>

      </Flex>
    </Card>
  )
}

export default CollectableRewardCard