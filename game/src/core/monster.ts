import { game } from "..";
import { MonsterId } from "../data/monsters";
import { IContent } from "../types/content";
import { Team } from "../types/team";
import { BattleAnimation, BattleHitData, IBattle } from "./battle";
import { IItem } from "./item";
import { ISkill } from "./skill";
import { IStats, IValueStat } from "./stats";

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
   * - Evolved stars: 1 to 3 (6 to 8)
   * - Transcended stars: 1 to 3 ( 9 to 11)
   */
  stars: number;
}

export interface IMonsterData {
  index: number;

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

export interface IBattleMonster {
  id: MonsterId;
  level: number;

  team: Team;

  health: number;
  energy: number;
  stats: IStats;

  animation?: BattleAnimation;
}

export function id(monster: IMonster) {
  return `${monster.id}-${monster.stars}-${monster.time}`;
}

export function monsterToIndex(monsterId: MonsterId) {
  return game.monsters[monsterId].index;
}

export function indexToMonster(index: number) {
  return Object.entries(game.monsters).filter(([_, data]) => index === data.index)[0]?.[0] as MonsterId | undefined;
}

export function getEvolvedMonster(monsters: [IMonster?, IMonster?, IMonster?]): IMonster | undefined {
  const monster1 = monsters[0];
  const monster2 = monsters[1];
  const monster3 = monsters[2];

  // All monsters must be defined
  if (!monster1 || !monster2 || !monster3) return undefined;

  const id1 = game.monster.id(monster1);
  const id2 = game.monster.id(monster2);
  const id3 = game.monster.id(monster3);

  // No duplicate monsters
  if (id1 === id2 || id2 === id3 || id1 === id3) return undefined;

  // All monsters should have the same id
  if (
    monster1.id !== monster2.id ||
    monster2.id !== monster3.id ||
    monster1.id !== monster3.id
  ) return undefined;

  // All monsters should have the same stars
  if (
    monster1.stars !== monster2.stars ||
    monster2.stars !== monster3.stars ||
    monster1.stars !== monster3.stars
  ) return undefined;

  // Only first monsters level and items are kept when evolving
  return {
    id: monster1.id,
    stars: monster1.stars + 1,
    level: monster1.level,
    time: Date.now(),
    items: monster1.items,
  };
}

export function getSacrificeRewards(monsters: IMonster[]): IContent[] {
  return [
    { item: game.constants.createGold(1000 * monsters.length) },
    { item: game.constants.createFood(1000 * monsters.length) },
  ]
}

export function createBattleMonster(monster: IMonster | undefined, team: Team): IBattleMonster | undefined {
  if (!monster) return undefined;

  const stats = getStats(monster);
  return {
    id: monster.id,
    level: monster.level,
    team: team,
    health: game.stats.value(stats.health),
    energy: game.constants.baseEnergy,
    stats: stats,
  }
}

export function getPower(monster: IMonster) {
  if (!monster) return 0;

  let power = 0;

  const stats = getStats(monster);

  power += game.stats.value(stats.health);
  power += game.stats.value(stats.damage);
  power += game.stats.value(stats.speed);

  return power;
}

export function getStats(monster: IMonster): IStats {
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

  let health: IValueStat = { baseValue: Math.floor(data.health * starMultiplier * levelMultiplier), valueBonus: 0, percentBonus: 0 };
  let damage: IValueStat = { baseValue: Math.floor(data.damage * starMultiplier * levelMultiplier), valueBonus: 0, percentBonus: 0 };
  let speed: IValueStat = { baseValue: Math.floor(data.speed * starMultiplier), valueBonus: 0, percentBonus: 0 };

  // Add monster's items' stats
  Object
    .values(monster.items ?? {})
    .map(item => game.item.getStats(item))
    .forEach(stats => {
      if (!stats) return;

      health = game.stats.addValue(health, stats.health);
      damage = game.stats.addValue(damage, stats.damage);
      speed = game.stats.addValue(speed, stats.speed);
    })

  return { health, damage, speed };
}

export function getLevelUpCost(monster: IMonster): { gold: number, food: number } {
  const levelMultiplier = game.maths.curve(monster.level);

  return {
    gold: Math.ceil(levelMultiplier * game.constants.monsterLevelUpCostGoldMultiplier),
    food: Math.ceil(levelMultiplier * game.constants.monsterLevelUpCostFoodMultiplier),
  }
}

export * as monster from "./monster";