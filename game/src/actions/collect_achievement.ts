import { game } from "..";
import { IPlayer } from "../core/player";
import { AchievementId } from "../data/achievements";

type Props = {
  achievementId: AchievementId;
}

export function actable(player: IPlayer, props: Props): boolean {
  const done = game.achievement.getDone(player, { id: props.achievementId });
  const todo = game.achievement.getTodo({ id: props.achievementId });

  // Check if daily quest has been completed
  if (done < todo) return false;

  // Check if daily quest rewards has been completed
  if (player.events.achievements.collected[props.achievementId]) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  // Set the daily quest completed
  player.events.achievements.collected[props.achievementId] = true;

  // Add rewards to player's bag
  game.actions.changePlayerContents.act(
    player,
    { toAdd: game.achievements[props.achievementId].rewards },
  );
}

export * as collectAchievement from "./collect_achievement";