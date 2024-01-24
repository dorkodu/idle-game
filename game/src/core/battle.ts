import { game } from "..";
import { BattleId } from "../data/battles";
import { IContent } from "../types/content";
import { BattleLineup, MonsterLineup } from "../types/lineup";
import { IBattleMonster } from "./monster";
import { IPlayer } from "./player";

export interface IBattle {
  id: BattleId;

  ally: BattleLineup;
  enemy: BattleLineup;
  turn: { count: number, ally: number[], enemy: number[] };
  rewards: IContent[];

  animation: number;
}

export interface IBattleData<T = unknown> {
  getLineup: (player: IPlayer, props?: T) => MonsterLineup;
  getRewards: (player: IPlayer, props?: T) => IContent[];

  canCreate: (player: IPlayer, props?: T) => boolean;
  onCreate: (player: IPlayer, props?: T) => IBattle;

  onWin: (player: IPlayer, battle: IBattle, props?: T) => void;
}

export type BattleAnimationId = BattleAnimation["id"];
export type BattleAnimation =
  { id: "hit", anim: number, } |
  { id: "getHit", anim: number, data: BattleHitData }

export type BattleHitData = { damage: number }

export type BattleResult = "win" | "lose" | "progress";

export function progress(battle: IBattle): BattleResult {
  // Clear monster animations
  battle.ally.forEach(m => m && (m.animation = undefined));
  battle.enemy.forEach(m => m && (m.animation = undefined));

  const monster = getTurnMonster(battle);
  if (monster) {
    // Monster performs it's turn
    game.monsters[monster.id].onTurn(battle, monster);

    // Add the monster to the list since it has performed
    battle.turn[monster.team].push(getMonsterIndex(battle[monster.team], monster));
  }

  // If all of the target team is dead, the current team won
  if (getAliveMonsters(battle.ally).length === 0) {
    return "lose";
  }

  // If all of the current team is dead, the target team won
  if (getAliveMonsters(battle.enemy).length === 0) {
    return "win";
  }

  if (isTurnComplete(battle)) {
    battle.turn = { count: battle.turn.count + 1, ally: [], enemy: [] }
  }

  // If turn is 15 and still no one won, ally loses
  if (battle.turn.count >= 15) return "lose";

  return "progress";
}

export function getAliveMonsters(lineup: BattleLineup): IBattleMonster[] {
  return lineup.filter(m => m && m.health > 0) as IBattleMonster[];
}

export function getTurnMonster(battle: IBattle): IBattleMonster | undefined {
  const alive = [...getAliveMonsters(battle.ally), ...getAliveMonsters(battle.enemy)];
  const sorted = sortMonstersBySpeed(alive);
  const monsters = sorted.filter(m => {
    const lineup = battle[m.team];
    const turn = battle.turn[m.team];
    return !turn.includes(getMonsterIndex(lineup, m))
  });
  const monster = monsters[0];
  return monster;
}

export function getEnemyMonsters(battle: IBattle, monster: IBattleMonster) {
  return monster.team === "ally" ? battle.enemy : battle.ally;
}

export function getFrontMonsters(_lineup: BattleLineup) {

}

export function getBackMonsters(_lineup: BattleLineup) {

}

export function isTurnComplete(battle: IBattle) {
  const playedAllyCount = battle.ally.filter(m => {
    if (!m) return true;
    if (m.health <= 0) return true;
    return battle.turn.ally.includes(getMonsterIndex(battle.ally, m));
  }).filter(Boolean).length;

  const playedEnemyCount = battle.enemy.filter(m => {
    if (!m) return true;
    if (m.health <= 0) return true;
    return battle.turn.enemy.includes(getMonsterIndex(battle.enemy, m));
  }).filter(Boolean).length;

  const alliesCompleted = playedAllyCount >= battle.ally.filter(Boolean).length;
  const enemiesCompleted = playedEnemyCount >= battle.enemy.filter(Boolean).length;
  return alliesCompleted && enemiesCompleted;
}

export function sortMonstersBySpeed(monsters: IBattleMonster[]) {
  return monsters.sort((a, b) => game.stats.value(b.stats.speed) - game.stats.value(a.stats.speed));
}

export function getMonsterIndex(lineup: BattleLineup, monster: IBattleMonster): number {
  return lineup.findIndex(v => v === monster);
}

export * as battle from "./battle";