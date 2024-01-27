import Emoji from "@/components/Emoji";
import ResourceButton from "@/components/buttons/ResourceButton";
import Content from "@/components/custom/Content";
import FullscreenModal from "@/components/custom/FullscreenModal";
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { Button, Card, Divider, Flex, Progress, ScrollArea, Title } from "@mantine/core";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

function TowerModal({ opened, onClose }: ModalProps) {
  const player = useApiStore(state => state.player);

  const gold = player?.items[game.constants.goldId]?.count ?? 0;
  const stage = player?.map.tower.stage ?? 0;

  const lineup = player ? game.battles.tower.getLineup(player) : undefined;
  const power = game.lineup.getPower(lineup);

  const enemies = lineup ? Object.values(lineup).filter(Boolean) as IMonster[] : undefined
  const rewards = player ? game.battles.tower.getRewards(player) : undefined;

  const onBattle = () => {
    const player = useApiStore.getState().player;
    if (!player) return;

    useAppStore.setState(s => {
      s.modals.lineup = { opened: true, battleId: "tower" }
    });
  }

  return (
    <FullscreenModal
      opened={opened} onClose={onClose}
      header={<ResourceButton emoji="🪙" count={gold} />}
    >
      <Flex direction="column" align="center" justify="center" gap="md" h="100%">

        <Card withBorder radius="md" w="100%" maw={360}>
          <Flex direction="column" gap="xs">

            <Divider label="Stage Enemies" />

            <Flex align="center" gap="xs">
              <Emoji emoji="⚡" />
              <Title order={5}>{util.formatNumber(power)}</Title>
            </Flex>

            <ScrollArea>
              <Flex gap="xs">
                {enemies?.map((c, i) => <Content key={i} monster={c} />)}
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
                {rewards?.map(c =>
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