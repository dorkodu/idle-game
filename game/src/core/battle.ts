import { MonsterId } from "../data/monsters";
import { Content } from "../types/content";
import { BattleLineup } from "../types/lineup";
import { Team } from "../types/team";
import { IStats } from "./stats";

export type BattleType = "campaign" | "tower";

export interface IBattle {
  type: BattleType;

  ally: BattleLineup;
  enemy: BattleLineup;
  turn: { count: number, ally: number[], enemy: number[] };
  rewards: Content[];

  animation: number;
}

export interface IBattleMonster {
  id: MonsterId;
  level: number;

  team: Team;

  health: number;
  energy: number;
  stats: IStats;

  animation?: BattleAnimation;
}

export type BattleAnimationId = BattleAnimation["id"];
export type BattleAnimation =
  { id: "hit", anim: number, } |
  { id: "getHit", anim: number, data: BattleHitData }

export type BattleHitData = {
  damage: number;
}