import ResourceButton from "@/components/buttons/ResourceButton";
import CollectableRewardCard, { CollectableRewardCardProps } from "@/components/cards/CollectableRewardCard";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { IAchievement } from "@game/core/achievement";
import { AchievementId } from "@game/data/achievements";
import { game } from "@game/index";
import { Divider, Flex, ScrollArea } from "@mantine/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function AchievementsModal({ opened, onClose }: ModalProps) {
  const { t } = useTranslation();

  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const gem = player?.items[game.constants.gemId]?.count ?? 0;

  const achievements = useMemo((): CollectableRewardCardProps[] => {
    if (!player) return [];
    return (Object.keys(game.achievements) as AchievementId[])
      .map((achievementId) => {
        const achievement: IAchievement = { id: achievementId };
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
      })
      .sort((a, b) => a.collectible || b.collected ? -1 : 0)
  }, [player]);

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={
        <>
          <ResourceButton emoji="🪙" count={gold} />
          <ResourceButton emoji="💎" count={gem} />
        </>
      }
    >
      <ScrollArea h="100%">
        <Flex direction="column" gap="md" h="100%">

          <Divider label="Achievements" />

          {achievements.map(achievement => <CollectableRewardCard key={achievement.name} {...achievement} />)}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default AchievementsModal