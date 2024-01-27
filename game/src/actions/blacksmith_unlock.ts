import { game } from "..";
import { IItem } from "../core/item";
import { IPlayer } from "../core/player"; import { ItemId } from "../data/items";
;

type Props = {
  itemId: string;
}

export function actable(player: IPlayer, props: Props): boolean {
  const itemBox = player.items[props.itemId];
  if (!itemBox) return false;
  if (itemBox.id !== "ot_item_box") return false;
  if (itemBox.count <= 0) return false;

  return true;
}

/**
 * Unlocks an item with the box's tier & stars.
 * @param player 
 * @param props 
 * @returns The item unlocked.
 */
export function act(player: IPlayer, props: Props): IItem | undefined {
  if (!actable(player, props)) return;

  const itemBox = player.items[props.itemId];
  if (!itemBox) return;

  // Try selecting a random item
  const itemIds = Object.keys(game.equipmentItems) as ItemId[];
  const itemId = game.random.percent(
    { seed: Date.now() },
    itemIds.map(itemId => ({ result: itemId, percent: 1 / game.items[itemId].index }))
  );

  if (!itemId) return;

  // Consturct the randomly selected item, remove box and add item to the player's bag
  const item: IItem = { id: itemId, tier: itemBox.tier, stars: itemBox.stars, count: 1 }

  game.actions.changePlayerContents.act(
    player,
    {
      toRemove: [{ item: game.constants.createItemBox(itemBox.tier, itemBox.stars, 1) }],
      toAdd: [{ item }],
    }
  );

  game.signals.unlockItem.dispatch({ player });

  return item;
}

export * as blacksmithUnlock from "./blacksmith_unlock";