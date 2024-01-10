import { IBattleMonster } from "../core/battle"
import { IMonster, monster } from "../core/monster"
import { Team } from "./team"

export type Lineup = [
  string?,
  string?,
  string?,
  string?,
  string?,
  string?,
]

export type MonsterLineup = [
  IMonster?,
  IMonster?,
  IMonster?,
  IMonster?,
  IMonster?,
  IMonster?,
]

export type BattleLineup = [
  IBattleMonster?,
  IBattleMonster?,
  IBattleMonster?,
  IBattleMonster?,
  IBattleMonster?,
  IBattleMonster?,
]

export function createBattleLineup(monsters: MonsterLineup, team: Team): BattleLineup {
  return monsters.map(m => monster.createBattleMonster(m, team)) as BattleLineup;
}

export function getPower(lineup: MonsterLineup | undefined): number {
  let power = 0;

  lineup?.forEach(m => {
    if (!m) return;
    power += monster.getPower(m);
  });

  return power;
}

export * as lineup from "./lineup";