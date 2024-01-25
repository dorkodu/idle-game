import { game } from "..";
import { IPlayer } from "../core/player";
import { IContent } from "../types/content";
import { IShopItem, ShopType } from "../types/shop";

type Props = {
  shop: ShopType;
  index: number;
}

export function actable(player: IPlayer, props: Props): boolean {
  let shopItem: IShopItem | undefined = undefined;
  let bought = 0;

  let gold = player.items[game.constants.goldId]?.count ?? 0;
  let gem = player.items[game.constants.gemId]?.count ?? 0;

  switch (props.shop) {
    case "gold":
      shopItem = game.constants.shopGold[props.index];
      bought = player.shop.gold[props.index] ?? 0;

      if (!shopItem) return false;
      if ((shopItem.price.gold ?? 0) > gold) return false;

      break;

    case "gem":
      shopItem = game.constants.shopGem[props.index];
      bought = player.shop.gem[props.index] ?? 0;

      if (!shopItem) return false;
      if ((shopItem.price.gem ?? 0) > gem) return false;

      break;

    // Only shops with in-game resources need this check
    default: return true;
  }

  // Only check buy limit if player's snapshot is the same as the shop's one
  if (
    game.constants.version === player.shop.snapshot &&
    shopItem.limit > 0 &&
    shopItem.limit <= bought
  ) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  // If not already, set player's snapshot to shops one
  if (game.constants.version !== player.shop.snapshot) {
    player.shop = {
      snapshot: game.constants.version,
      startDate: Date.now(),
      premium: {},
      gold: {},
      gem: {},
    }
  }

  let shopItem: IShopItem | undefined = undefined;
  let itemCost: IContent[] = [];

  switch (props.shop) {
    case "gold":
      shopItem = game.constants.shopGold[props.index];
      itemCost.push({ item: game.constants.createGold(shopItem?.price.gold ?? 0) });
      break;
    case "gem":
      shopItem = game.constants.shopGem[props.index];
      itemCost.push({ item: game.constants.createGem(shopItem?.price.gem ?? 0) });
      break;
  }

  if (!shopItem) return;

  // Increase the bought amount
  if (!player.shop[props.shop][props.index]) player.shop[props.shop][props.index] = 0;
  player.shop[props.shop][props.index]++;

  // Reduce the item cost from the bag
  game.actions.changePlayerContents.act(player, { toRemove: itemCost });

  // Add the item to the bag
  game.actions.changePlayerContents.act(player, { toAdd: [{ item: shopItem.item }] });
}

export * as buyShopItem from "./buy_shop_item";