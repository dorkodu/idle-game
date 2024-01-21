import { useAppStore } from "@/stores/appStore";
import { ActionIcon, Flex, Indicator, Modal, Title, useMantineTheme } from "@mantine/core"
import { IconPlayerTrackNextFilled, IconQuestionMark } from "@tabler/icons-react"
import BattleMonster from "../custom/BattleMonster";
import { useEffect } from "react";
import { game } from "@game/index";
import { BattleResult } from "@game/lib/battle";

function BattleModal() {
  const battle = useAppStore(state => state.modals.battle);
  const close = () => useAppStore.setState(s => { s.modals.battle.opened = false });

  const theme = useMantineTheme();

  const onHelp = () => {

  }

  const onSpeed = () => {
    useAppStore.setState(s => {
      s.modals.battle.speed = s.modals.battle.speed % 3 + 1;
    })
  }

  useEffect(() => {
    if (!battle.opened) return;

    const callback = () => {
      let result: BattleResult = "progress";
      let battleSpeed = 1;

      useAppStore.setState(s => {
        battleSpeed = s.modals.battle.speed;

        if (!s.modals.battle.battle) return;
        result = game.battle.progress(s.modals.battle.battle);
      });

      if (result !== "progress") setTimeout(close, ms);
      else timeout = setTimeout(callback, ms / battleSpeed);
    }

    const ms = 1000;
    let timeout = setTimeout(callback, ms / battle.speed);
    return () => clearTimeout(timeout)
  }, [battle.opened]);

  return (
    <Modal
      opened={battle.opened} onClose={() => { }}
      withCloseButton={false} fullScreen
      styles={{ body: { height: "100%", backgroundImage: "url(/endless-constellation.svg)" } }} radius={0}
    >
      <Flex
        direction="column" justify="center"
        mx="auto" maw={theme.breakpoints.xs} h="100%" pos="relative" gap="xl"
      >

        <Flex align="center" justify="space-between" pos="absolute" top={0} left={0} right={0} h={32}>

          <ActionIcon radius="xl" size={32} onClick={onHelp}>
            <IconQuestionMark />
          </ActionIcon>

          <Title ta="center" order={5}>Turn {battle.battle?.turn.count || 1}</Title>

          <Indicator withBorder label={`${battle.speed}x`} size={16}>
            <ActionIcon radius="xl" size={32} onClick={onSpeed}>
              <IconPlayerTrackNextFilled />
            </ActionIcon>
          </Indicator>

        </Flex>

        <Flex direction="column" gap="xl" mx="auto" mt={48} w="100%">
          <Flex direction="column" align="center" gap="md">
            <Flex gap="md">
              <BattleMonster monster={battle.battle?.enemy[5]} />
              <BattleMonster monster={battle.battle?.enemy[4]} />
              <BattleMonster monster={battle.battle?.enemy[3]} />
              <BattleMonster monster={battle.battle?.enemy[2]} />
            </Flex>
            <Flex gap="md">
              <BattleMonster monster={battle.battle?.enemy[1]} />
              <BattleMonster monster={battle.battle?.enemy[0]} />
            </Flex>
          </Flex>

          <Flex direction="column" align="center" gap="md">
            <Flex gap="md">
              <BattleMonster monster={battle.battle?.ally[0]} />
              <BattleMonster monster={battle.battle?.ally[1]} />
            </Flex>
            <Flex gap="md">
              <BattleMonster monster={battle.battle?.ally[2]} />
              <BattleMonster monster={battle.battle?.ally[3]} />
              <BattleMonster monster={battle.battle?.ally[4]} />
              <BattleMonster monster={battle.battle?.ally[5]} />
            </Flex>
          </Flex>

        </Flex>

      </Flex>
    </Modal>
  )
}

export default BattleModal