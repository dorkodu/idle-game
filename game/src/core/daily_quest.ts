import { game } from "..";
import { DailyQuestId } from "../data/daily_quests";
import { Content } from "../types/content";
import { IPlayer } from "./player";

export interface IDailyQuest {
  id: DailyQuestId;
}

export interface IDailyQuestData {
  targetProgress: number;
  rewards: Content[];
  onInit: () => void;
}

export function getTodoAll() {
  return Object.values(game.dailyQuests).length;
}

export function getDoneAll(player: IPlayer) {
  let count = 0;

  const dailyQuestIds = Object.keys(game.dailyQuests) as DailyQuestId[];
  dailyQuestIds.forEach(id => {
    const done = player.events.dailyQuests.progress[id] ?? 0;
    const todo = game.dailyQuests[id].targetProgress;
    if (done >= todo) count++;
  });

  return count;
}

export function getTodo(dailyQuest: IDailyQuest): number {
  return game.dailyQuests[dailyQuest.id].targetProgress;
}

export function getDone(player: IPlayer, dailyQuest: IDailyQuest): number {
  return player.events.dailyQuests.progress[dailyQuest.id] ?? 0;
}

export function getResetDate(startDate: number) {
  const date = new Date(startDate);

  date.setUTCHours(23, 59, 59);

  return date.getTime();
}

export * as dailyQuest from "./daily_quest";