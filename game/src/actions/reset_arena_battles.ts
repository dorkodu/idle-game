import { IPlayer } from "../core/player";

type Props = {

}

export function actable(_player: IPlayer, _props: Props): boolean {
  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  const date = Date.now();
  player.map.arena.dates = [date, date + 1, date + 2];
}

export * as resetArenaBattles from "./reset_arena_battles";