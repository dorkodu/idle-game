import { game } from "..";
import { IAchievement, IAchievementData } from "../core/achievement";
import { IPlayer } from "../core/player";

function listener(player: IPlayer, achievementId: AchievementId) {
  const achievement: IAchievement = { id: achievementId };

  let todo = game.achievement.getTodo(achievement);
  let done = game.achievement.getDone(player, achievement);

  player.events.achievements.progress[achievementId] = Math.min(done + 1, todo);
}

function create_passCampaignStage(): IAchievementData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit() { game.signals.progressCampaign.add(({ player }) => listener(player, "passCampaignStage1")) },
  }
}

function create_passCampaignTier(): IAchievementData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit() { game.signals.progressCampaign.add(({ player }) => listener(player, "passCampaignTierF")) },
  }
}

export type AchievementId = keyof typeof achievements
export const achievements = {
  passCampaignStage1: create_passCampaignStage(),
  passCampaignTierF: create_passCampaignTier(),
}

// Initialize all the achievements with signals
Object.values(achievements).forEach(achievement => { achievement.onInit() });