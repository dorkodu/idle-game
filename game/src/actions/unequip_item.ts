import { IPlayer } from "../core/player";
import { ItemTypeEquipment } from "../types/item_type";
import { actions } from "./_actions";

type Props = {
  monster: string;
  type: ItemTypeEquipment;
}

export function actable(player: IPlayer, props: Props): boolean {
  const monster = player.monsters[props.monster];
  if (!monster) return false;

  // If monster has no equipped items
  if (!monster.items) return false;

  // If no item is equipped in the target slot
  if (!monster.items[props.type]) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const monster = player.monsters[props.monster];
  if (!monster) return;

  const item = monster.items?.[props.type];
  if (!item) return;

  // Remove the item from the slot
  delete monster.items?.[props.type];

  // Add the removed item to the player's inventory
  actions.changePlayerContents.act(
    player,
    { toAdd: [{ item }] },
  );
}

export * as unequipItem from "./unequip_item";