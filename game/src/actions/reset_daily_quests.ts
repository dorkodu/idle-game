import { game } from "..";
import { IPlayer } from "../core/player";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  const currentDate = new Date();
  const resetDate = new Date(game.dailyQuest.getResetDate(player.events.dailyQuests.startDate));

  // Check if currentDate has not passed resetDate
  if (currentDate.getTime() < resetDate.getTime()) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  // Reset the daily quest properties
  player.events.dailyQuests = {
    startDate: Date.now(),
    progress: {},
    collected: {},
  };
}

export * as resetDailyQuests from "./reset_daily_quests";