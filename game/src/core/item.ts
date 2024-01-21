import { game } from "..";
import { ItemId } from "../data/items";
import { ItemType, ItemTypeEquipment, ItemTypeOther } from "../types/item_type";
import { Tier } from "../types/tier";
import { IStats } from "./stats";

export interface IItem {
  id: ItemId;
  count: number;
  tier: Tier;

  /**
   * Stars are upgradeable.
   * Upgrade cost is significantly increased for the next type of star.
   * - Yellow stars: 1 to 5
   */
  stars: number;
}

export type IItemData = {
  type: ItemTypeEquipment;
  index: number;
  stats: IStats;
} |
{
  type: ItemTypeOther;
  index: number;
}

export function id(item: IItem) {
  return `${item.id}-${item.tier}-${item.stars}`;
}

export function itemToIndex(itemId: ItemId): number {
  return game.items[itemId].index;
}

export function indexToItem(index: number, type: ItemType): ItemId | undefined {
  return Object.entries(game.itemData[type]).filter(([_, data]) => index === data.index)[0]?.[0] as ItemId | undefined;
}

export function getStats(item: IItem): IStats | undefined {
  const data = game.items[item.id];
  if (data.type === "other") return undefined;

  /**
   * 1 star  -> 1
   * 2 stars -> 1.1
   * 3 stars -> 1.2
   * 4 stars -> 1.3
   * 5 stars -> 1.4
   */
  const starMultiplier = (1 - 0.1) + (item.stars / 10);

  /**
   * S Tier -> 1.6
   * A Tier -> 1.5
   * B Tier -> 1.4
   * C Tier -> 1.3
   * D Tier -> 1.2
   * E Tier -> 1.1
   * F Tier -> 1
   */
  const tierMultiplier = 1 + (game.tier.tierToIndex(item.tier) / 10)

  const multiplier = starMultiplier * tierMultiplier;
  const { health, damage, speed } = data.stats;

  return {
    health: {
      baseValue: Math.floor(health.baseValue * multiplier),
      valueBonus: Math.floor(health.valueBonus * multiplier),
      percentBonus: Math.floor(health.percentBonus * multiplier),
    },
    damage: {
      baseValue: Math.floor(damage.baseValue * multiplier),
      valueBonus: Math.floor(damage.valueBonus * multiplier),
      percentBonus: Math.floor(damage.percentBonus * multiplier),
    },
    speed: {
      baseValue: Math.floor(speed.baseValue * multiplier),
      valueBonus: Math.floor(speed.valueBonus * multiplier),
      percentBonus: Math.floor(speed.percentBonus * multiplier),
    },
  }
}

export function getPower(item: IItem) {
  if (!item) return 0;

  let power = 0;

  const stats = getStats(item);
  if (!stats) return 0;

  power += game.stats.value(stats.health);
  power += game.stats.value(stats.damage);
  power += game.stats.value(stats.speed);

  return power;
}

export * as item from "./item";