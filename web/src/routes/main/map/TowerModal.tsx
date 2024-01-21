import Emoji from "@/components/Emoji";
import Content from "@/components/custom/Content";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, Progress, ScrollArea } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function TowerModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const stage = player?.map.tower.stage ?? 0;
  const enemies = Object.values(game.player.getTowerLineup(stage)).filter(Boolean) as IMonster[];
  const rewards = game.player.getTowerRewards(stage);

  const onBattle = () => {
    const player = useApiStore.getState().player;
    if (!player) return;

    useAppStore.setState(s => {
      s.modals.lineup = {
        opened: true,
        battle: game.player.createTowerBattle(player),
      }
    });
  }

  return (
    <FullscreenModal opened={opened} onClose={onClose}>
      <Flex direction="column" align="center" justify="center" gap="md" h="100%">

        <Card withBorder radius="md" w="100%" maw={360}>
          <Flex direction="column" gap="xs">
            <Divider label="Stage Enemies" />
            <ScrollArea>
              <Flex gap="xs">
                {enemies.map((c, i) => <Content key={i} monster={c} />)}
              </Flex>
            </ScrollArea>
          </Flex>
        </Card>

        <Emoji emoji="🗼" size={100} />

        <Progress.Root size="xl" w="100%" maw={100}>
          <Progress.Section value={100} striped animated>
            <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%", overflow: "visible" }}>
              {`Stage ${stage + 1}`}
            </Progress.Label>
          </Progress.Section>
        </Progress.Root>

        <Button size="md" onClick={onBattle}>Battle</Button>

        <Card withBorder radius="md" w="100%" maw={360}>
          <Flex direction="column" gap="xs">
            <Divider label="Stage Rewards" />
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
          </Flex>
        </Card>

      </Flex>
    </FullscreenModal>
  )
}

export default TowerModal