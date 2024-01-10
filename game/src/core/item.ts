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

export * as item from "./item";