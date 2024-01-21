import { game } from "..";
import { IPlayer } from "../core/player";
import { BattleResult } from "../lib/battle";

type Props = {

}

export function actable(player: IPlayer, _props: Props): boolean {
  // If player has no monsters in their lineup
  if (game.player.getMonsterLineup(player).filter(Boolean).length <= 0) return false;

  return true;
}

export function act(player: IPlayer, _props: Props) {
  if (!actable(player, _props)) return;

  const battle = game.player.createTowerBattle(player);
  if (!battle) return;

  // Play out the battle until it ends
  let result: BattleResult = "progress";
  while (result === "progress") result = game.battle.progress(battle);

  if (result === "lose") return;

  // Add player battle reward contents
  game.actions.changePlayerContents.act(player, { toAdd: battle.rewards });

  // Increase the stage
  player.map.tower.stage++;
}

export * as towerBattle from "./tower_battle";