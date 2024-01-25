import { ActionIcon, Button, Card, Divider, Flex, Menu, Text, Title } from '@mantine/core';
import Draggable from 'react-draggable';
import { draggable, handle } from './DevTools.css';
import { IconDots, IconX } from '@tabler/icons-react';
import { useHotkeys } from '@mantine/hooks';
import { useState } from 'react';
import { game } from '@game/index';

type Tab = keyof typeof tabs;
const tabs = {
  shop: <Shop />,
  monsters: <Monsters />,
  items: <Items />,
  campaign: <Campaign />,
  tower: <Tower />,
  arena: <Arena />,
  blacksmith: <Blacksmith />,
  altar: <Altar />,
  daily_quests: <DailyQuests />,
  achievements: <Achievements />,
}

function DevTools() {
  const [open, setOpen] = useState(false);
  useHotkeys([["Backquote", () => setOpen(!open)]]);

  const [tab, setTab] = useState<Tab>("campaign");

  if (!open) return null;
  return (
    <Draggable defaultClassName={draggable} bounds="body" handle=".handle">
      <Card>
        <Flex direction="column" gap="md">

          <Flex justify="space-between" gap="md">
            <Title order={5} className={`handle ${handle}`}>{`Dev Tools (v${game.constants.version})`}</Title>
            <ActionIcon size={32} onClick={() => setOpen(false)}><IconX /></ActionIcon>
          </Flex>

          <Button.Group>
            <Button fullWidth variant="default">Reset</Button>
            <Button fullWidth variant="default">Save</Button>
            <Button fullWidth variant="default">Load</Button>
            <Menu position="bottom-end">
              <Menu.Target>
                <Button variant="default" p="xs" style={{ flexShrink: 0 }}>
                  <IconDots />
                </Button>
              </Menu.Target>

              <Menu.Dropdown w={200}>
                {Object.keys(tabs).map(tab =>
                  <Menu.Item key={tab} onClick={() => setTab(tab as Tab)}>
                    <Text size="sm" tt="capitalize">{tab.replaceAll("_", " ")}</Text>
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Button.Group>

          <Divider label={<Text size="xs" tt="capitalize">{tab}</Text>} />

          {tabs[tab]}

        </Flex>
      </Card>
    </Draggable>
  )
}

export default DevTools

function Shop() {
  return (
    <>Shop</>
  )
}

function Monsters() {
  return (
    <>Monsters</>
  )
}

function Items() {
  return (
    <>Items</>
  )
}

function Campaign() {
  return (
    <>Campaign</>
  )
}

function Tower() {
  return (
    <>Tower</>
  )
}

function Arena() {
  return (
    <>Arena</>
  )
}

function Blacksmith() {
  return (
    <>Blacksmith</>
  )
}

function Altar() {
  return (
    <>Altar</>
  )
}

function DailyQuests() {
  return (
    <>DailyQuests</>
  )
}

function Achievements() {
  return (
    <>Achievements</>
  )
}