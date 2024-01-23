import { game } from "..";
import { IPlayer } from "../core/player";
import { DailyQuestId } from "../data/daily_quests";

type Props = {
  dailyQuestId: DailyQuestId;
}

export function actable(player: IPlayer, props: Props): boolean {
  const startDate = new Date(player.events.dailyQuests.startDate);
  const endDate = new Date(game.dailyQuest.getResetDate(Date.now()));

  // Check startDate and endDate are not in the same day
  if (
    startDate.getUTCFullYear() !== endDate.getUTCFullYear() ||
    startDate.getUTCMonth() !== endDate.getUTCMonth() ||
    startDate.getUTCDate() !== endDate.getUTCDate()
  ) return false;

  const done = game.dailyQuest.getDone(player, { id: props.dailyQuestId });
  const todo = game.dailyQuest.getTodo({ id: props.dailyQuestId });

  // Check if daily quest has been completed
  if (done < todo) return false;

  // Check if daily quest rewards has been completed
  if (player.events.dailyQuests.collected[props.dailyQuestId]) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  // Set the daily quest completed
  player.events.dailyQuests.collected[props.dailyQuestId] = true;

  // Add rewards to player's bag
  game.actions.changePlayerContents.act(
    player,
    { toAdd: game.dailyQuests[props.dailyQuestId].rewards },
  );
}

export * as collectDailyQuest from "./collect_daily_quest";