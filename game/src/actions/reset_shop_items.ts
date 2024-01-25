import { game } from "..";
import { IPlayer } from "../core/player";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  const currentDate = new Date();
  const resetDate = new Date(game.shop.getResetDate(player.shop.startDate));

  // Check if currentDate has not passed resetDate
  if (currentDate.getTime() < resetDate.getTime()) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  // Reset the shop properties
  player.shop = {
    snapshot: game.constants.version,
    startDate: Date.now(),
    premium: {},
    gold: {},
    gem: {},
  }
}

export * as resetShopItems from "./reset_shop_items";