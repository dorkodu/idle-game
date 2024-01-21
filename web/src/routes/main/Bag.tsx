import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList"
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IItem } from "@game/core/item";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { Card, Flex, SegmentedControl } from "@mantine/core"
import { useState } from "react"

function Bag() {
  const [tab, setTab] = useState<"monster" | "item">("monster");
  const onTabChange = (value: string) => {
    switch (value) {
      case "monster": break;
      case "item": break;
      default: return;
    }

    setTab(value);
  }

  return (
    <Flex direction="column" gap="md" h="100%">

      <SegmentedControl
        mx="auto" w="100%" maw={360} style={{ flexShrink: 0 }}
        data={[
          { value: "monster", label: "Monsters" },
          { value: "item", label: "Items" },
        ]}
        value={tab} onChange={onTabChange}
      />

      {tab === "monster" && <Monsters />}
      {tab === "item" && <Items />}

    </Flex>
  )
}

function Monsters() {
  const monsters = useApiStore(s => s.player?.monsters);

  const onClick = (m: IMonster) => {
    useAppStore.setState(s => {
      s.modals.monsterDetails = { opened: true, monsterId: game.monster.id(m) };
    });
  }

  return (
    <ContentList>
      {monsters && Object.values(monsters).map(m =>
        <Content key={game.monster.id(m)} monster={m} onClick={() => onClick(m)} />
      )}
    </ContentList>
  )
}

function Items() {
  const items = useApiStore(s => s.player?.items);

  const onClick = (i: IItem) => {
    useAppStore.setState(s => {
      s.modals.itemDetails = { opened: true, itemId: game.item.id(i) };
    });
  }

  return (
    <ContentList>
      {items && Object.values(items).map(i =>
        <Content key={game.item.id(i)} item={i} onClick={() => onClick(i)} />
      )}
    </ContentList>
  )
}

export default Bag