import { constants, game } from "..";
import { IPlayer } from "../core/player";
import { BattleResult, battle } from "../lib/battle";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  // If player has no monsters in their lineup
  if (game.player.getMonsterLineup(player).filter(Boolean).length <= 0) return false;

  return true;
}

export function act(player: IPlayer, _props: Props) {
  if (!actable(player, _props)) return;

  const _battle = game.campaign.createBattle(player);
  if (!_battle) return;

  // Play out the battle until it ends
  let result: BattleResult = "progress";
  while (result === "progress") result = battle.progress(_battle);

  if (result === "lose") return;

  // Increase the stage
  player.campaign.stage++;

  if (player.campaign.stage < constants.campaignStageCount) return;
  player.campaign.stage = 0;

  // Increase the campaign
  const campaignIndex = game.campaign.campaignToIndex(player.campaign.id);
  const nextCampaign = game.campaign.indexToCampaign(campaignIndex + 1);
  player.campaign.id = nextCampaign ?? player.campaign.id;

  if (nextCampaign) return;
  player.campaign.id = game.campaign.indexToCampaign(0) ?? "tree_of_life";

  // Increase the tier
  const tierIndex = game.tier.tierToIndex(player.campaign.tier);
  const nextTier = game.tier.indexToTier(tierIndex + 1);
  player.campaign.tier = nextTier ?? player.campaign.tier;
}

export * as campaignBattle from "./campaign_battle";