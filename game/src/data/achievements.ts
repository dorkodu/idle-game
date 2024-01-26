import { game } from "..";
import { IAchievement, IAchievementData } from "../core/achievement";
import { IPlayer } from "../core/player";
import { Tier } from "../types/tier";

function increaseProgress(player: IPlayer, achievement: IAchievement) {
  let todo = game.achievement.getTodo(achievement);
  let done = game.achievement.getDone(player, achievement);

  player.events.achievements.progress[achievement.id] = Math.min(done + 1, todo);
}

function create_passCampaignStage(stage: number): IAchievementData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(achievement) {
      game.signals.progressCampaign.add(({ player }) => {
        const completed = game.campaign.getCompletedStages(
          player.campaign.tier,
          player.campaign.id,
          player.campaign.stage,
        );

        if (completed === stage) increaseProgress(player, achievement);
      });
    },
  }
}

function create_passCampaignTier(tier: Tier): IAchievementData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(achievement) {
      game.signals.progressCampaign.add(({ player }) => {
        if (player.campaign.tier === tier && player.campaign.stage === 0) {
          increaseProgress(player, achievement);
        }
      });
    },
  }
}

export type AchievementId = keyof typeof achievements
export const achievements = {
  passCampaignStage1: create_passCampaignStage(1),
  passCampaignStage5: create_passCampaignStage(5),
  passCampaignStage10: create_passCampaignStage(10),
  passCampaignStage25: create_passCampaignStage(25),
  passCampaignStage50: create_passCampaignStage(50),
  passCampaignStage100: create_passCampaignStage(100),
  passCampaignStage150: create_passCampaignStage(150),
  passCampaignStage200: create_passCampaignStage(200),
  passCampaignStage250: create_passCampaignStage(250),
  passCampaignStage300: create_passCampaignStage(300),
  passCampaignStage350: create_passCampaignStage(350),

  passCampaignTierF: create_passCampaignTier("F"),
  passCampaignTierE: create_passCampaignTier("E"),
  passCampaignTierD: create_passCampaignTier("D"),
  passCampaignTierC: create_passCampaignTier("C"),
  passCampaignTierB: create_passCampaignTier("B"),
  passCampaignTierA: create_passCampaignTier("A"),
  passCampaignTierS: create_passCampaignTier("S"),
}

// Initialize all the achievements with signals
Object
  .entries(achievements)
  .forEach(([achievemetnId, achievement]) => {
    achievement.onInit({ id: achievemetnId as AchievementId });
  });