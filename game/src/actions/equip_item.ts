import { game } from "..";
import { IItem } from "../core/item";
import { IPlayer } from "../core/player";
import { items } from "../data/items";
import { actions } from "./_actions";

type Props = {
  item: string;
  monster: string;
}

export function actable(player: IPlayer, props: Props): boolean {
  const monster = player.monsters[props.monster];
  if (!monster) return false;

  const item = player.items[props.item];
  if (!item) return false;

  // If the item is not equipable
  const itemType = items[item.id].type;
  if (itemType === "other") return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const monster = player.monsters[props.monster];
  if (!monster) return;

  const item = player.items[props.item];
  if (!item) return;

  const itemType = items[item.id].type;
  if (itemType === "other") return;

  // Check if the slot is already full, if so, unequip the item
  const isSlotFull = monster.items?.[itemType];
  if (isSlotFull) game.actions.unequipItem.act(player, { monster: props.monster, type: itemType });

  // Equip the new item
  const itemToEquip: IItem = { ...item, count: 1 };
  if (!monster.items) monster.items = { [itemType]: itemToEquip }
  else monster.items[itemType] = itemToEquip;

  // Reduce the item's count
  actions.changePlayerContents.act(
    player,
    { toRemove: [{ item: { ...item, count: 1 } }] },
  );
}

export * as equipItem from "./equip_item";