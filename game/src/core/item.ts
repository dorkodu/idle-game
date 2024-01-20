import { game } from "..";
import { ItemId } from "../data/items";
import { ItemTypeEquipment, ItemTypeOther } from "../types/item_type";
import { Tier } from "../types/tier";
import { IStats } from "./stats";

export interface IItem {
  id: ItemId;
  count: number;
  tier: Tier;
  stars: number;
}

export type IItemData = { type: ItemTypeEquipment; stats: IStats; } | { type: ItemTypeOther; }

export function id(item: IItem) {
  return `${item.id}-${item.tier}-${item.stars}`;
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

export * as item from "./item";