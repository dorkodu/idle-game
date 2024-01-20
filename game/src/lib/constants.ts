import { game } from "..";
import { IItem } from "../core/item";

export const maxEnergy = 100;
export const baseEnergy = 50;
export const hitEnergyIncrease = 25;
export const getHitEnergyIncrease = 10;
export const energyDamageMultiplier = 1.5;

export const monsterLevelUpCostGoldMultiplier = 1.05;
export const monsterLevelUpCostFoodMultiplier = 0.95;

export const campaignStageCount = 10;

export const playerLevelToXpBase = 100;

export const maxLevel = 369;
export const levelUpGemReward = 10;

// Other item IDs
export const goldId = game.item.id({ id: "ot_gold", tier: "F", stars: 0, count: 0 });
export const gemId = game.item.id({ id: "ot_gem", tier: "F", stars: 0, count: 0 });
export const foodId = game.item.id({ id: "ot_food", tier: "F", stars: 0, count: 0 });
export const xpId = game.item.id({ id: "ot_xp", tier: "F", stars: 0, count: 0 });
export const createGold = (count: number): IItem => ({ id: "ot_gold", tier: "F", stars: 0, count });
export const createGem = (count: number): IItem => ({ id: "ot_gem", tier: "F", stars: 0, count });
export const createFood = (count: number): IItem => ({ id: "ot_food", tier: "F", stars: 0, count });
export const createXp = (count: number): IItem => ({ id: "ot_xp", tier: "F", stars: 0, count });

export * as constants from "./constants";