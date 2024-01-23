import { game } from "..";
import { IMonster } from "../core/monster";
import { IPlayer } from "../core/player";

type Props = {
  monsters: [string, string, string];
}

export function actable(player: IPlayer, props: Props): boolean {
  const monsters = props.monsters.map(monsterId => player.monsters[monsterId]) as [IMonster?, IMonster?, IMonster?];
  const evolvedMonster = game.monster.getEvolvedMonster(monsters);
  if (!evolvedMonster) return false;

  return true;
}

export function act(player: IPlayer, props: Props): boolean {
  if (!actable(player, props)) return false;

  const monsters = props.monsters.map(monsterId => player.monsters[monsterId]) as [IMonster?, IMonster?, IMonster?];
  const evolvedMonster = game.monster.getEvolvedMonster(monsters);
  if (!evolvedMonster) return false;

  const monster1 = monsters[0];
  const monster2 = monsters[1];
  const monster3 = monsters[2];
  if (!monster1 || !monster2 || !monster3) return false;

  // Add the evolved monster and remove the consumed monsters
  // Add the items of the monster 2 & 3's items to bag (monster 1 items are kept on the evolved monster)
  game.actions.changePlayerContents.act(
    player,
    {
      toAdd: [
        { monster: evolvedMonster },
        ...Object.values({ ...monster2?.items, ...monster3?.items }).map(item => ({ item })),
      ],
      toRemove: [
        { monster: monster1 },
        { monster: monster2 },
        { monster: monster3 },
      ],
    }
  );

  game.signals.evolveMonster.dispatch({ player });

  return true;
}

export * as altarEvolve from "./altar_evolve";