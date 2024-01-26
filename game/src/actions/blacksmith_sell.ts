import { game } from "..";
import { IItem } from "../core/item";
import { IPlayer } from "../core/player";
import { IContent } from "../types/content";
;

type Props = {
  items: string[];
}

export function actable(player: IPlayer, props: Props): boolean {
  const items = props.items.map(i => player.items[i]).filter(Boolean) as IItem[];

  if (items.length === 0) return false;

  return true;
}

export function act(player: IPlayer, props: Props): boolean {
  if (!actable(player, props)) return false;

  const items = props.items.map(i => player.items[i]).filter(Boolean) as IItem[];

  const rewards = game.item.getSellRewards(items);
  const itemContents: IContent[] = items.map(item => ({ item }));

  // Add sell rewards to the bag
  // Remove the sold items from the bag
  game.actions.changePlayerContents.act(
    player,
    {
      toAdd: rewards,
      toRemove: itemContents,
    }
  );

  game.signals.sellItems.dispatch({ player });

  return true;
}

export * as blacksmithSell from "./blacksmith_sell";