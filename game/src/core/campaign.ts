import { game } from "..";
import { CampaignId } from "../data/campaigns";
import { Farm } from "../types/farm";
import { Tier } from "../types/tier";

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