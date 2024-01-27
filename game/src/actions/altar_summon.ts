import { game } from "..";
import { IMonster } from "../core/monster";
import { IPlayer } from "../core/player"; import { MonsterId } from "../data/monsters";
;

type Props = {
  itemId: string;
}

export function actable(player: IPlayer, props: Props): boolean {
  const monsterScroll = player.items[props.itemId];
  if (!monsterScroll) return false;
  if (monsterScroll.id !== "ot_monster_scroll") return false;
  if (monsterScroll.count <= 0) return false;

  return true;
}

/**
 * Summons a monsters with the scroll's stars count.
 * @param player 
 * @param props 
 * @returns The monster summoned.
 */
export function act(player: IPlayer, props: Props): IMonster | undefined {
  if (!actable(player, props)) return;

  const monsterScroll = player.items[props.itemId];
  if (!monsterScroll) return;

  // Try selecting a random monster
  const monsterIds = Object.keys(game.monsters) as MonsterId[];
  const monsterId = game.random.percent(
    { seed: Date.now() },
    monsterIds.map(monsterId => ({ result: monsterId, percent: 1 / game.monsters[monsterId].index }))
  );

  if (!monsterId) return;

  // Consturct the randomly selected monster, remove scroll and add monster to the player's bag
  const monster: IMonster = { id: monsterId, stars: monsterScroll.stars, level: 1, time: Date.now() }

  game.actions.changePlayerContents.act(
    player,
    {
      toRemove: [{ item: game.constants.createMonsterScroll(monsterScroll.stars, 1) }],
      toAdd: [{ monster }],
    }
  );

  game.signals.summonMonster.dispatch({ player });

  return monster;
}

export * as altarSummon from "./altar_summon";