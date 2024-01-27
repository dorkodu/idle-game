import { assets } from "@/assets/assets";
import Content from "@/components/custom/Content";
import ContentAsset from "@/components/custom/ContentAsset";
import ContentList from "@/components/custom/ContentList"
import { util } from "@/lib/util";
import { useApiStore } from "@/stores/apiStore";
import { useAppStore } from "@/stores/appStore";
import { IItem } from "@game/core/item";
import { IMonster } from "@game/core/monster";
import { game } from "@game/index";
import { ItemType } from "@game/types/item_type";
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
  const [tab, setTab] = useState<"all" | ItemType>("all");

  const player = useApiStore(s => s.player);
  const items = useMemo((): IItem[] => {
    if (!player) return [];
    let items: IItem[] = [];

    switch (tab) {
      case "other": items = game.player.getItemsByType(player, "other"); break;
      case "weapon": items = game.player.getItemsByType(player, "weapon"); break;
      case "armor": items = game.player.getItemsByType(player, "armor"); break;
      case "amulet": items = game.player.getItemsByType(player, "amulet"); break;
      case "rune": items = game.player.getItemsByType(player, "rune"); break;
      case "ring": items = game.player.getItemsByType(player, "ring"); break;

      case "all":
      default: items = Object.values(player.items); break;
    }

    return util.sortItems(items);
  }, [tab, player]);

  const onClick = (i: IItem) => {
    useAppStore.setState(s => { s.modals.itemDetails = { opened: true, item: i } });
  }

  return (
    <>
      <Button.Group mx="auto" w="100%" maw={360}>
        <Button fullWidth px={0} variant={tab !== "all" ? "default" : undefined} onClick={() => setTab("all")}>All</Button>
        <Button fullWidth px={0} variant={tab !== "other" ? "default" : undefined} onClick={() => setTab("other")}>
          <ContentAsset emoji={assets.item("ot_gold").emoji} size={24} />
        </Button>
        <Button fullWidth px={0} variant={tab !== "weapon" ? "default" : undefined} onClick={() => setTab("weapon")}>
          <ContentAsset image={assets.item("we_ancient_sword").image} size={24} />
        </Button>
        <Button fullWidth px={0} variant={tab !== "armor" ? "default" : undefined} onClick={() => setTab("armor")}>
          <ContentAsset image={assets.item("ar_banded_mail_1").image} size={24} />
        </Button>
        <Button fullWidth px={0} variant={tab !== "amulet" ? "default" : undefined} onClick={() => setTab("amulet")}>
          <ContentAsset image={assets.item("am_bone_gray").image} size={24} />
        </Button>
        <Button fullWidth px={0} variant={tab !== "rune" ? "default" : undefined} onClick={() => setTab("rune")}>
          <ContentAsset image={assets.item("ru_generic").image} size={24} />
        </Button>
        <Button fullWidth px={0} variant={tab !== "ring" ? "default" : undefined} onClick={() => setTab("ring")}>
          <ContentAsset image={assets.item("ri_clay").image} size={24} />
        </Button>
      </Button.Group>

      <ContentList>
        {items.map(i => <Content key={game.item.id(i)} item={i} onClick={() => onClick(i)} />)}
      </ContentList>
    </>
  )
}

export default Bag