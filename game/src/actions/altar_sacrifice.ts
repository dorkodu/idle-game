import { game } from "..";
import { IMonster } from "../core/monster";
import { IPlayer } from "../core/player"; import { Content } from "../types/content";
;

type Props = {
  monsters: string[];
}

export function actable(player: IPlayer, props: Props): boolean {
  const monsters = props.monsters.map(m => player.monsters[m]).filter(Boolean) as IMonster[];

  if (monsters.length === 0) return false;

  return true;
}

export function act(player: IPlayer, props: Props): boolean {
  if (!actable(player, props)) return false;

  const monsters = props.monsters.map(m => player.monsters[m]).filter(Boolean) as IMonster[];

  const monsterContents: Content[] = monsters.map(monster => ({ monster }));
  const itemContents: Content[] = [];
  const rewards = game.monster.getSacrificeRewards(monsters);

  monsters.forEach(m => {
    Object.values(m.items ?? {}).forEach(item => { itemContents.push({ item }) })
  });

  // Add all monsters' items to the bag
  // Add sacrifice rewards to the bag
  // Remove the sacrificed monsters from the bag
  game.actions.changePlayerContents.act(
    player,
    {
      toAdd: [...itemContents, ...rewards],
      toRemove: monsterContents,
    }
  );

  return true;
}

export * as altarSacrifice from "./altar_sacrifice";