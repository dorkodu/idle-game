import ResourceButton from "@/components/buttons/ResourceButton";
import CollectableRewardCard from "@/components/cards/CollectableRewardCard";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { AchievementId } from "@game/data/achievements";
import { game } from "@game/index";
import { Divider, Flex, ScrollArea } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function AchievementsModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const gem = player?.items[game.constants.gemId]?.count ?? 0;

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

          {(Object.keys(game.achievements) as AchievementId[]).map(achievementId =>
            <CollectableRewardCard key={achievementId} achievement={{ id: achievementId }} />
          )}

        </Flex>
      </ScrollArea>
    </FullscreenModal>
  )
}

export default AchievementsModal