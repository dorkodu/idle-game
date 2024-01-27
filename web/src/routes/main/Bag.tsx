import Content from "@/components/custom/Content";
import ContentList from "@/components/custom/ContentList"
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IItem } from "@game/core/item";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { Button, Flex } from "@mantine/core"
import { useMemo, useState } from "react"

function Bag() {
  const [tab, setTab] = useState<"monster" | "item">("monster");

  return (
    <Flex direction="column" gap="md" h="100%">

      <Button.Group mx="auto" w="100%" maw={360}>
        <Button fullWidth px={0} variant={tab !== "monster" ? "default" : undefined} onClick={() => setTab("monster")}>Monsters</Button>
        <Button fullWidth px={0} variant={tab !== "item" ? "default" : undefined} onClick={() => setTab("item")}>Items</Button>
      </Button.Group>

      {tab === "monster" && <Monsters />}
      {tab === "item" && <Items />}

    </Flex>
  )
}

function Monsters() {
  const _monsters = useApiStore(s => s.player?.monsters);
  const monsters = useMemo((): IMonster[] => {
    if (!_monsters) return [];
    return util.sortMonsters(Object.values(_monsters));
  }, [_monsters]);

  const onClick = (m: IMonster) => {
    useAppStore.setState(s => {
      s.modals.monsterDetails = { opened: true, monsterId: game.monster.id(m) };
    });
  }

  return (
    <ContentList>
      {monsters.map(m => <Content key={game.monster.id(m)} monster={m} onClick={() => onClick(m)} />)}
    </ContentList>
  )
}

function Items() {
  const _items = useApiStore(s => s.player?.items);
  const items = useMemo((): IItem[] => {
    if (!_items) return [];
    return util.sortItems(Object.values(_items));
  }, [_items]);

  const onClick = (i: IItem) => {
    useAppStore.setState(s => { s.modals.itemDetails = { opened: true, item: i } });
  }

  return (
    <ContentList>
      {items.map(i => <Content key={game.item.id(i)} item={i} onClick={() => onClick(i)} />)}
    </ContentList>
  )
}

export default Bag