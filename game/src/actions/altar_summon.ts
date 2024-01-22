import { IPlayer } from "../core/player";;

type Props = {

}

export function actable(_player: IPlayer, _props: Props): boolean {
  return true;
}

export function act(player: IPlayer, _props: Props) {
  if (!actable(player, _props)) return;
}

export * as altarSummon from "./altar_summon";