import { game } from "..";
import { IPlayer } from "../core/player";;

type Props = {
  itemId: string;
}

export function actable(player: IPlayer, props: Props): boolean {
  const item = player.items[props.itemId];
  if (!item) return false;

  // 3 copies of the same item is needed to upgrade
  if (item.count < 3) return false;

  // Item can be max upgraded to S tier and 5 stars
  if (item.tier === "S" && item.stars >= 5) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const item = player.items[props.itemId];
  if (!item) return;

  // Get the upgraded version of the item if exists
  const upgradedItem = game.item.getUpgradedItem(item);
  if (!upgradedItem) return;

  // Add the upgraded item & reduce consumed item count by 3
  game.actions.changePlayerContents.act(
    player,
    {
      toAdd: [{ item: upgradedItem }],
      toRemove: [{ item: { id: item.id, tier: item.tier, stars: item.stars, count: 3 } }],
    },
  );
}

export * as blacksmithUpgrade from "./blacksmith_upgrade";