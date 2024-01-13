import { useAppStore } from "@/stores/appStore";
import { ActionIcon, Card, Flex, Image, Modal, Title, useMantineTheme } from "@mantine/core";
import { IconArrowBigLeftFilled, IconArrowBigRightFilled, IconArrowLeft } from "@tabler/icons-react";
import ResourceButton from "../buttons/ResourceButton";
import { useApiStore } from "@/stores/apiStore";
import { game } from "@game/index";
import Stars from "../custom/Stars";
import { assets } from "@/assets/assets";
import Emoji from "../Emoji";
import { useState } from "react";
import { IMonster } from "@game/core/monster";

function MonsterDetailsModal() {
  const monsterDetails = useAppStore(state => state.modals.monsterDetails);
  const close = () => useAppStore.setState(s => { s.modals.monsterDetails.opened = false });

  const theme = useMantineTheme();

  const [tab, setTab] = useState<"stats" | "items">("stats");

  const player = useApiStore(state => state.player);

  const monsterId = monsterDetails.monsterId;
  const monster = player && monsterId && player?.monsters[monsterId];

  const gold = player?.items[game.constants.goldId]?.count;
  const food = player?.items[game.constants.foodId]?.count;

  const onChange = (offset: number) => {

  }

  return (
    <Modal
      opened={monsterDetails.opened} onClose={close}
      withCloseButton={false} fullScreen
      styles={{ body: { height: "100%" } }} radius={0}
    >
      <Flex
        direction="column" justify="center"
        mx="auto" maw={theme.breakpoints.xs} h="100%" pos="relative"
      >

        <Flex align="center" justify="space-between" gap="md" pos="absolute" top={0} left={0} right={0} h={32}>
          <ActionIcon radius="xl" size={32} onClick={close}>
            <IconArrowLeft />
          </ActionIcon>

          <Flex justify="end" gap="xs" w="100%">
            <ResourceButton emoji="🪙" count={gold} />
            <ResourceButton emoji="🍏" count={food} />
          </Flex>
        </Flex>

        {monster &&
          <Flex direction="column" gap="xl" mx="auto" mt={48} w="100%" maw={360}>

            <Flex direction="column" align="center" gap="xs">
              <Title order={5}>{monster.id}</Title>

              <Flex gap={5}>
                <Stars stars={monster.stars} size={16} />
              </Flex>

              <Flex align="center" justify="center" gap="md">
                <ActionIcon onClick={() => onChange(-1)} variant="transparent" radius="xl" size={32} c="var(--text-color)">
                  <IconArrowBigLeftFilled />
                </ActionIcon>

                <Image
                  src={assets.monster(monster.id)} w={100} h={100}
                  style={{ imageRendering: "pixelated" }}
                  draggable={false}
                />

                <ActionIcon onClick={() => onChange(+1)} variant="transparent" radius="xl" size={32} c="var(--text-color)">
                  <IconArrowBigRightFilled />
                </ActionIcon>
              </Flex>
            </Flex>

            <Card withBorder h={360} radius="md" style={{ overflow: "visible" }}>

              <Flex gap="xs" pos="absolute" mt={-36} style={{ left: "50%", transform: "translate(-50%,0)" }}>
                <ActionIcon variant="default" radius="xl" size={40} onClick={() => setTab("stats")}>
                  <Emoji emoji="📊" size={20} />
                </ActionIcon>
                <ActionIcon variant="default" radius="xl" size={40} onClick={() => setTab("items")}>
                  <Emoji emoji="⚔" size={20} />
                </ActionIcon>
              </Flex>

              {tab === "stats" && <Stats monster={monster} />}
              {tab === "items" && <Items monster={monster} />}

            </Card>

          </Flex>
        }

      </Flex>
    </Modal>
  )
}

interface Props {
  monster: IMonster;
}

function Stats({ monster }: Props) {
  return (
    <>Stats</>
  )
}

function Items({ monster }: Props) {
  return (
    <>Items</>
  )
}

export default MonsterDetailsModal