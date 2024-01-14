import { assets } from "@/assets/assets"
import Emoji from "@/components/Emoji"
import TierBadge from "@/components/custom/TierBadge"
import { util } from "@/lib/util"
import { useApiStore } from "@/stores/apiStore"
import { useAppStore } from "@/stores/appStore"
import { game } from "@game/index"
import { ActionIcon, Button, Card, Flex, Image, Progress, Text } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"

function Campaign() {
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

  }

  const onBattle = () => {
    useAppStore.setState(s => { s.modals.lineup.opened = true });
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

      <Flex direction="column" justify="center" pos="relative" w="100%" maw={100}>
        <Progress value={(campaignProgress / campaignLength) * 100} size="lg" />
        <Text size="sm" pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
          {`${campaignProgress} / ${campaignLength}`}
        </Text>
      </Flex>

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
  )
}

export default Campaign