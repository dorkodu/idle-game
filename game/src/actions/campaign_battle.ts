import { constants, game } from "..";
import { IPlayer } from "../core/player";
import { BattleResult } from "../lib/battle";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  // If player has no monsters in their lineup
  if (game.player.getMonsterLineup(player).filter(Boolean).length <= 0) return false;

  return true;
}

export function act(player: IPlayer, _props: Props) {
  if (!actable(player, _props)) return;

  const battle = game.campaign.createBattle(player);
  if (!battle) return;

  // Play out the battle until it ends
  let result: BattleResult = "progress";
  while (result === "progress") result = game.battle.progress(battle);

  if (result === "lose") return;

  // Add player battle reward contents
  game.actions.changePlayerContents.act(player, { toAdd: battle.rewards });

  // Increase the stage
  player.campaign.stage++;

  if (player.campaign.stage < constants.campaignStageCount) return;
  player.campaign.stage = 0;

  const campaignIndex = game.campaign.campaignToIndex(player.campaign.id);
  const tierIndex = game.tier.tierToIndex(player.campaign.tier);

  // Increase the campaign
  const nextCampaign = game.campaign.indexToCampaign(campaignIndex + 1);
  player.campaign.id = nextCampaign ?? player.campaign.id;

  if (!nextCampaign || campaignIndex >= tierIndex + 2) return;
  player.campaign.id = game.campaign.indexToCampaign(0) ?? "tree_of_life";

  // Increase the tier
  const nextTier = game.tier.indexToTier(tierIndex + 1);
  player.campaign.tier = nextTier ?? player.campaign.tier;
}

export * as campaignBattle from "./campaign_battle";