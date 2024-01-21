import { IBattleMonster, IMonster } from "../core/monster"
import { Team } from "./team"
import { game } from "../index";

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
  return monsters.map(m => game.monster.createBattleMonster(m, team)) as BattleLineup;
}

export function getPower(lineup: MonsterLineup | undefined): number {
  let power = 0;

  lineup?.forEach(m => {
    if (!m) return;
    power += game.monster.getPower(m);
  });

  return power;
}

export * as lineup from "./lineup";