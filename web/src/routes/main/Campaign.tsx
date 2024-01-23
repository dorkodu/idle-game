import { assets } from "@/assets/assets"
import Emoji from "@/components/Emoji"
import TierBadge from "@/components/custom/TierBadge"
import { util } from "@/lib/util"
import { useApiStore } from "@/stores/apiStore"
import { useAppStore } from "@/stores/appStore"
import { game } from "@game/index"
import { ActionIcon, Button, Card, Flex, Image, Modal, Progress, Select, Text, Timeline } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconCheck, IconMinus, IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"

function Campaign() {
  const [opened, { open, close }] = useDisclosure();

  const player = useApiStore(state => state.player);
  const campaign = useApiStore(state => state.player?.campaign);

  const campaignProgress = campaign?.stage ?? 0;
  const campaignLength = game.constants.campaignStageCount;

  const [farm, setFarm] = useState(player ? game.player.getCampaignFarm(player) : undefined);
  useEffect(() => {
    const callback = () => {
      const player = useApiStore.getState().player;
      if (!player) return;

      setFarm(game.player.getCampaignFarm(player));
    }

    const interval = setInterval(callback, 1000);
    return () => clearTimeout(interval);
  }, []);

  const onSearch = () => {
    open();
  }

  const onBattle = () => {
    const player = useApiStore.getState().player;
    if (!player) return;

    useAppStore.setState(s => {
      s.modals.lineup = { opened: true, battleId: "campaign" }
    });
  }

  const onFarm = () => {
    useApiStore.setState(s => {
      if (!s.player) return;
      game.actions.collectCampaignFarm.act(s.player, {});

      setFarm(game.player.getCampaignFarm(s.player));
    });
  }

  if (!campaign) return null;
  return (
    <>
      <Flex direction="column" align="center" justify="center" gap="md" h="100%">

        <Flex align="center" pos="relative">

          <Flex pr="xs" pos="absolute" right="100%">
            <ActionIcon radius="xl" size={32} onClick={onSearch}>
              <IconSearch />
            </ActionIcon>
          </Flex>

          <Flex maw={120} style={{ wordBreak: "break-word" }}>
            <Text fz="lg" fw="bold" ta="center" lineClamp={3}>{campaign.id}</Text>
          </Flex>

          <Flex pl="xs" pos="absolute" left="100%">
            <TierBadge tier={campaign.tier} />
          </Flex>

        </Flex>

        <Image
          src={assets.campaign(campaign.id)} draggable={false}
          style={{ imageRendering: "pixelated", width: "auto", height: 200, flex: "unset" }}
        />

        <Progress.Root size="xl" w="100%" maw={100}>
          <Progress.Section value={(campaignProgress / campaignLength) * 100}>
            <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
              {`${campaignProgress} / ${campaignLength}`}
            </Progress.Label>
          </Progress.Section>
        </Progress.Root>

        <Button size="md" onClick={onBattle}>Battle</Button>

        <Card withBorder p={0} w="100%" maw={300}>
          <Button.Group>

            <Flex align="center" px="xs" style={{ flex: 1 }}>
              <Flex align="center" w="100%">
                <Emoji emoji="🪙" size={20} />
                &nbsp;
                <Text size="sm" w="100%">{util.formatNumber(farm?.gold || 0)}</Text>
              </Flex>
              <Flex align="center" w="100%">
                <Emoji emoji="🍏" size={20} />
                &nbsp;
                <Text size="sm">{util.formatNumber(farm?.food || 0)}</Text>
              </Flex>
              <Flex align="center" w="100%">
                <Emoji emoji="⭐" size={20} />
                &nbsp;
                <Text size="sm">{util.formatNumber(farm?.xp || 0)}</Text>
              </Flex>
              <Flex>
                <Emoji emoji="📦" size={20} />
              </Flex>
            </Flex>

            <Button onClick={onFarm}>Get</Button>

          </Button.Group>
        </Card>

      </Flex>

      <CampaignDetailsModal opened={opened} onClose={close} />
    </>
  )
}

export default Campaign

interface CampaignDetailsModalProps {
  opened: boolean;
  onClose: () => void;
}

function CampaignDetailsModal({ opened, onClose }: CampaignDetailsModalProps) {
  const player = useApiStore(state => state.player);

  const [tier, setTier] = useState<number>(game.tier.tierToIndex(player ? player.campaign.tier : "F"));
  const onChangeTier = (value: string | null) => {
    if (!value) return;

    const tier = game.tier.indexToTier(Number(value));
    if (!tier) return;

    setTier(game.tier.tierToIndex(tier));
  }

  const playerTierIndex: number = player ? game.tier.tierToIndex(player.campaign.tier) : 0;
  const playerCampaignIndex: number = player ? game.campaign.campaignToIndex(player.campaign.id) : 0;

  let campaignDone = -1;
  const campaignTodo = game.tier.tierToCampaignCount(game.tier.indexToTier(tier));

  if (playerTierIndex > tier) campaignDone = Object.values(game.campaigns).length;
  else if (playerTierIndex === tier) campaignDone = playerCampaignIndex;

  return (
    <Modal
      opened={opened} onClose={onClose}
      centered size={360}
      title="Campaign Details"
      styles={{ content: { height: "100%", maxHeight: 480 } }}
    >
      <Flex direction="column" gap="md">

        <Select
          value={`${tier}`} onChange={onChangeTier}
          data={game.tiers.map((tier, i) => ({ value: `${i}`, label: `${tier} Tier` }))}
        />

        <Timeline active={campaignDone} bulletSize={24} lineWidth={2}>
          {[...Array(campaignTodo).keys()].map((i) => {
            const campaignId = game.campaign.indexToCampaign(i);

            let done: number = 0;
            const todo = game.constants.campaignStageCount;

            // Previously passed tier
            if (playerTierIndex > tier) {
              done = game.constants.campaignStageCount;
            }
            // Previous passed campaign of the same tier
            else if (playerTierIndex === tier && playerCampaignIndex > i) {
              done = game.constants.campaignStageCount;
            }
            // The current stage of the tier/campaign player is at
            else if (playerTierIndex === tier && playerCampaignIndex === i) {
              done = player?.campaign.stage ?? 0;
            }

            const completed = done >= todo;

            return (
              <Timeline.Item
                key={`${tier}-${i}`}
                title={campaignId}
                bullet={completed ? <IconCheck size={12} /> : <IconMinus size={12} />}
              >

                <Flex direction="column" align="start" gap="xs">
                  <Image
                    src={assets.campaign(campaignId)} draggable={false}
                    style={{ imageRendering: "pixelated", width: "auto", height: 128, flex: "unset" }}
                  />

                  <Progress.Root size="xl" w="100%">
                    <Progress.Section value={(done / todo) * 100}>
                      <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                        {`${done} / ${todo}`}
                      </Progress.Label>
                    </Progress.Section>
                  </Progress.Root>
                </Flex>

              </Timeline.Item>
            )
          })}
        </Timeline>

      </Flex>
    </Modal>
  )
}