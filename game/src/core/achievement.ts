import { game } from "..";
import { AchievementId } from "../data/achievements";
import { IContent } from "../types/content";
import { IPlayer } from "./player";

export interface IAchievement {
  id: AchievementId;
}

export interface IAchievementData {
  targetProgress: number;
  rewards: IContent[];
  onInit: () => void;
}

export function getTodo(achievement: IAchievement): number {
  return game.achievements[achievement.id].targetProgress;
}

export function getDone(player: IPlayer, achievement: IAchievement): number {
  return player.events.achievements.progress[achievement.id] ?? 0;
}

export * as achievement from "./achievement";