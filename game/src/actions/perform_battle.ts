import { game } from "..";
import { BattleResult } from "../core/battle";
import { IPlayer } from "../core/player";
import { BattleId } from "../data/battles";

type Props = {
  battleId: BattleId;
}

export function actable(player: IPlayer, props: Props): boolean {
  const canCreate = game.battles[props.battleId].canCreate(player);
  if (!canCreate) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const battle = game.battles[props.battleId].onCreate(player);
  if (!battle) return;

  // Play out the battle until it ends
  let result: BattleResult = "progress";
  while (result === "progress") result = game.battle.progress(battle);

  if (result === "win") {
    game.battles[props.battleId].onWin(player, battle);
  }
}

export * as performBattle from "./perform_battle";