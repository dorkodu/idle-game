import { IPlayer } from "../core/player";

type Props = {
  monster: string | undefined;
  index: number;
}

export function actable(_player: IPlayer, props: Props): boolean {
  if (props.index < 0 || props.index > 5) return false;

  return true;
}

export function act(player: IPlayer, props: Props) {
  if (!actable(player, props)) return;

  player.lineup[props.index] = props.monster;
}

export * as changeLineup from "./change_lineup";