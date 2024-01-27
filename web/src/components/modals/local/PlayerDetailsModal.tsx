import { Anchor, Avatar, Button, Divider, Flex, Image, Modal, Progress, Text, Title } from "@mantine/core";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import { assets } from "@/assets/assets";
import { util } from "@/lib/util";
import { IconChevronRight } from "@tabler/icons-react";
import { wrapText } from "@/styles/shared.css";
import ContentAsset from "@/components/custom/ContentAsset";
import PlayerDetailsMenu from "@/components/menus/PlayerDetailsMenu";

interface Props {
  opened: boolean;
  onClose: () => void;
}

function PlayerDetailsModal({ opened, onClose }: Props) {
  const player = useApiStore(state => state.player);

  const level = player?.level ?? 0;
  const xp = player?.xp ?? 0;
  const requiredXp = game.player.levelToXp(level);

  return (
    <Modal
      opened={opened} onClose={onClose}
      centered size={360}
      title="Player Details"
    >
      <Flex direction="column" gap="xl">

        <Flex direction="column">
          <Flex justify="space-between">
            <div style={{ width: 32, height: 32, visibility: "hidden" }} />

            <ContentAsset image={assets.monster("angel")} size={64} />

            <PlayerDetailsMenu />
          </Flex>

          <Title order={4} ta="center" className={wrapText}>{player?.username}</Title>

          <Divider label={<Text fw="bold">{`Level ${level}`}</Text>} />

          <Progress.Root size={24} w="100%">
            <Progress.Section value={(xp / requiredXp) * 100}>
              <Progress.Label pos="absolute" style={{ transform: "translate(-50%,0)", left: "50%" }}>
                {`${util.formatNumber(xp)} / ${util.formatNumber(requiredXp)} XP`}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Flex>

        <Flex direction="column" gap="xs">
          <Divider label="Account Manager" />

          <Button h="auto" py="md" variant="default" styles={{ label: { flex: 1 } }}>
            <Flex align="center" gap="xs" w="100%">
              <Avatar />
              <Text fw="bold" ta="left" truncate style={{ flex: 1 }}>{player?.username}</Text>
              <IconChevronRight />
            </Flex>
          </Button>
        </Flex>

        <Flex direction="column" align="center">
          <Anchor href="https://dorkodu.com" mb="xs">
            <Image
              src={`${import.meta.env.BASE_URL}dorkodu-logo.svg`}
              mah={48}
            />
          </Anchor>

          <Title order={5}>Dorkodu © {new Date().getFullYear()}</Title>

          <Title order={6}>{`Idle Demo v${game.constants.version}`}</Title>

          <Flex gap="xs">
            <Anchor href="/privacy-policy">Privacy Policy</Anchor>
            <Anchor href="/terms-of-service">Terms of Service</Anchor>
          </Flex>
        </Flex>

      </Flex>
    </Modal>
  )
}

export default PlayerDetailsModal