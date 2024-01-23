import { game } from "..";
import { IDailyQuest, IDailyQuestData } from "../core/daily_quest"
import { IPlayer } from "../core/player";
import { signals } from "../lib/signals"

function listener(player: IPlayer, dailyQuestId: DailyQuestId) {
  const dailyQuest: IDailyQuest = { id: dailyQuestId };

  let todo = game.dailyQuest.getTodo(dailyQuest);
  let done = game.dailyQuest.getDone(player, dailyQuest);

  player.events.dailyQuests.progress[dailyQuestId] = Math.min(done + 1, todo);
}

function create_progressCampaign(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit() { signals.progressCampaign.add(({ player }) => listener(player, "progressCampaign")) },
  }
}

function create_progressTower(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit() { signals.progressTower.add(({ player }) => listener(player, "progressTower")) },
  }
}

export type DailyQuestId = keyof typeof dailyQuests
export const dailyQuests = {
  progressCampaign: create_progressCampaign(),
  progressTower: create_progressTower(),
}

// Initialize all the daily quests with signals
Object.values(dailyQuests).forEach(dailyQuest => { dailyQuest.onInit() });