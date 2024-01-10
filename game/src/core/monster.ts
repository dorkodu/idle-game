import { game } from "..";
import { MonsterId } from "../data/monsters";
import { BattleHitData, IBattle, IBattleMonster } from "./battle";
import { IItem } from "./item";
import { ISkill } from "./skill";
import { IStats } from "./stats";

export interface IMonster {
  time: number;

  id: MonsterId;
  level: number;

  items?: {
    weapon?: IItem;
    armor?: IItem;
    rune?: IItem;
    ring?: IItem;
    amulet?: IItem;
  }

  /**
   * Stars are upgradeable.
   * Upgrade cost is significantly increased for the next type of star.
   * - Yellow stars: 1 to 5
   * - Orange stars: 1 to 3
   * - Red stars: 1 to 5
   * - Transcended stars: 1 to 3
   */
  stars: number;
}

export interface IMonsterData {
  health: number;
  damage: number;
  speed: number;

  skills: {
    active: ISkill,
    passive: [ISkill?, ISkill?, ISkill?],
  }

  onTurn: (battle: IBattle, monster: IBattleMonster) => void;
  onHit: (battle: IBattle, attacker: IBattleMonster, target: IBattleMonster) => void;
  onGetHit: (battle: IBattle, attacker: IBattleMonster, target: IBattleMonster, data: BattleHitData) => void;
  onSkillHit: (battle: IBattle, monster: IBattleMonster) => void;
  onSkillGetHit: (battle: IBattle, monster: IBattleMonster) => void;
  onKill: (battle: IBattle, monster: IBattleMonster) => void;
  onDie: (battle: IBattle, monster: IBattleMonster) => void;
}

export function getPower(monster: IMonster) {
  if (!monster) return 0;

  let power = 0;

  const _stats = getStats(monster);

  power += game.stats.value(_stats.health);
  power += game.stats.value(_stats.damage);
  power += game.stats.value(_stats.speed);

  return power;
}

export function getStats(monster: IMonster): IStats {
  // TODO: Use items' stats for stats calculation
  const data = game.monsters[monster.id];

  /**
   * 1 star  -> 1
   * 2 stars -> 1.1
   * 3 stars -> 1.2
   * 4 stars -> 1.3
   * 5 stars -> 1.4
   */
  const starMultiplier = (1 - 0.1) + (monster.stars / 10);
  const levelMultiplier = game.maths.curve(monster.level);

  const health = data.health * starMultiplier * levelMultiplier;
  const damage = data.damage * starMultiplier * levelMultiplier;
  const speed = data.speed * starMultiplier;

  return {
    health: { baseValue: Math.floor(health), valueBonus: 0, percentBonus: 0 },
    damage: { baseValue: Math.floor(damage), valueBonus: 0, percentBonus: 0 },
    speed: { baseValue: Math.floor(speed), valueBonus: 0, percentBonus: 0 },
  }
}

export * as monster from "./monster";