import { game } from "..";
import { IDailyQuest, IDailyQuestData } from "../core/daily_quest"
import { IPlayer } from "../core/player";
import { signals } from "../lib/signals"

function increaseProgress(player: IPlayer, dailyQuest: IDailyQuest) {
  let todo = game.dailyQuest.getTodo(dailyQuest);
  let done = game.dailyQuest.getDone(player, dailyQuest);

  player.events.dailyQuests.progress[dailyQuest.id] = Math.min(done + 1, todo);
}

function create_playCampaign(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.playCampaign.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

function create_playTower(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.playTower.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

function create_collectCampaignFarm(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.collectCampaignFarm.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

function create_buyShopItem(): IDailyQuestData {
  return {
    targetProgress: 3,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.buyShopItem.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

function create_summonMonster(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.summonMonster.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

function create_unlockItem(): IDailyQuestData {
  return {
    targetProgress: 1,
    rewards: [{ item: game.constants.createGold(1000) }],
    onInit(dailyQuest) {
      signals.unlockItem.add(({ player }) => increaseProgress(player, dailyQuest));
    },
  }
}

export type DailyQuestId = keyof typeof dailyQuests
export const dailyQuests = {
  playCampaign: create_playCampaign(),
  collectCampaignFarm: create_collectCampaignFarm(),

  playTower: create_playTower(),

  buyShopItem: create_buyShopItem(),

  summonMonster: create_summonMonster(),
  unlockItem: create_unlockItem(),
}

// Initialize all the daily quests with signals
Object
  .entries(dailyQuests)
  .forEach(([dailyQuestId, dailyQuest]) => {
    dailyQuest.onInit({ id: dailyQuestId as DailyQuestId });
  });