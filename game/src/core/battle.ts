import { BattleId } from "../data/battles";
import { MonsterId } from "../data/monsters";
import { Content } from "../types/content";
import { BattleLineup, MonsterLineup } from "../types/lineup";
import { Team } from "../types/team";
import { IPlayer } from "./player";
import { IStats } from "./stats";

export interface IBattle {
  id: BattleId;

  ally: BattleLineup;
  enemy: BattleLineup;
  turn: { count: number, ally: number[], enemy: number[] };
  rewards: Content[];

  animation: number;
}

export interface IBattleData {
  getLineup: (player: IPlayer) => MonsterLineup;
  getRewards: (player: IPlayer) => Content[];

  canCreate: (player: IPlayer) => boolean;
  onCreate: (player: IPlayer) => IBattle;

  onWin: (player: IPlayer, battle: IBattle) => void;
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