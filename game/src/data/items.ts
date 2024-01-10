import { IItemData } from "../core/item";
import { ItemType } from "../types/item_type";

function createItemData(type: ItemType): IItemData {
  if (type === "other") return { type };
  return {
    type,
    stats: {
      health: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
      damage: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
      speed: { baseValue: 0, valueBonus: 0, percentBonus: 0 },
    }
  }
}

export type ItemId = keyof typeof items
export const items = {
  ot_gold: createItemData("other"),
  ot_gem: createItemData("other"),
  ot_food: createItemData("other"),
}