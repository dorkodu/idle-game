import { game } from "..";
import { CampaignId } from "../data/campaigns";
import { MonsterId } from "../data/monsters";
import { Content } from "../types/content";
import { Farm } from "../types/farm";
import { MonsterLineup } from "../types/lineup";
import { Tier } from "../types/tier";
import { IBattle } from "./battle";
import { IPlayer } from "./player";

export interface ICampaign {
  id: CampaignId;
}

export interface ICampaignData {
  index: number;
}

export function campaignToIndex(campaign: CampaignId) {
  return game.campaigns[campaign].index;
}

export function indexToCampaign(index: number) {
  return Object.entries(game.campaigns).filter(([_, data]) => index === data.index)[0]?.[0] as CampaignId | undefined;
}

export function createBattle(player: IPlayer): IBattle {
  const campaignLineup = getCampaignLineup(player.campaign.tier, player.campaign.id, player.campaign.stage);
  const campaignRewards = getCampaignRewards(player.campaign.tier, player.campaign.id, player.campaign.stage);

  return {
    ally: game.player.getBattleLineup(player),
    enemy: game.lineup.createBattleLineup(campaignLineup, "enemy"),
    turn: { count: 1, ally: [], enemy: [] },
    rewards: campaignRewards,
    animation: 0,
  }
}

export function getCampaignLineup(tier: Tier, campaign: CampaignId, stage: number): MonsterLineup {
  let monsterCount = 6;
  if (tier === "F" && campaign === "tree_of_life") monsterCount = Math.min(stage + 1, 6);

  const completedStages = getCompletedStages(tier, campaign, stage);
  const campaignIndex = game.campaign.campaignToIndex(campaign);

  const monsterLevel = completedStages + 1;
  const monsterStars = Math.min(campaignIndex + 1, 3);

  const lineup = Array(monsterCount).fill(0).map((_, i) => {
    const monsterId: MonsterId = game.random.percent(
      { seed: completedStages * i },
      Object.keys(game.monsters).map(result => ({ percent: 1, result: result as MonsterId }))
    ) || "angel";

    return {
      id: monsterId,
      level: monsterLevel,
      stars: monsterStars,
      time: i,
    }
  }) as MonsterLineup;

  return lineup;
}

export function getCampaignRewards(tier: Tier, campaign: CampaignId, stage: number): Content[] {
  return [];
}

export function getCampaignFarm(tier: Tier, campaign: CampaignId, stage: number): Farm {
  const completedStages = getCompletedStages(tier, campaign, stage);
  const multiplier = completedStages + 1;

  const goldMultiplier = 1.5;
  const foodMultiplier = 1;
  const xpMultiplier = 1.25;

  return {
    gold: Math.floor(1 * goldMultiplier * multiplier),
    food: Math.floor(1 * foodMultiplier * multiplier),
    xp: Math.floor(1 * xpMultiplier * multiplier),
  }
}

function getCompletedStages(tier: Tier, campaign: CampaignId, stage: number) {
  let count = stage;

  const tierIndex = game.tier.tierToIndex(tier);
  for (let i = 0; i < tierIndex; ++i) {
    const campaignCount = game.tier.tierToCampaignCount(game.tier.indexToTier(i));
    count += campaignCount * game.constants.campaignStageCount;
  }

  const campaignIndex = game.campaign.campaignToIndex(campaign);
  count += campaignIndex * game.constants.campaignStageCount;

  return count;
}

export * as campaign from "./campaign";