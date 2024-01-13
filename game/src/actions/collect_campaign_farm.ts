import { game } from "..";
import { IPlayer } from "../core/player";
import { Content } from "../types/content";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  // Get elapsed seconds between last farm date
  const elapsed = Math.floor((Date.now() - player.campaign.lastFarmDate) / 1000);

  // Campaign can be farmed each 5 seconds
  if (elapsed < 5) return false;

  return true;
}

export function act(player: IPlayer, _props: Props) {
  if (!actable(player, _props)) return;

  const farm = game.player.getCampaignFarm(player);

  const contents: Content[] = [
    { item: game.constants.createGold(farm.gold) },
    { item: game.constants.createFood(farm.food) },
  ];

  // Handle xp & level
  player.xp += farm.xp;
  const { level, xp } = game.player.handleXp(player);
  const levelChangeCount = level - player.level;
  player.level = level;
  player.xp = xp;

  // If player has leveled up, also increase their gems
  if (levelChangeCount > 0) {
    contents.push({ item: game.constants.createGem(levelChangeCount * game.constants.levelUpGemReward) });
  }

  player.campaign.lastFarmDate = Date.now();
  game.actions.changePlayerContents.act(player, { toAdd: contents });
}

export * as collectCampaignFarm from "./collect_campaign_farm";