import { game } from "..";
import { IItem } from "../core/item";
import { IShopItem, IShopSpecialOffer } from "../types/shop";

/// Battle constants \\\
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

/// Other item IDs \\\
export const createGold = (count: number): IItem => ({ id: "ot_gold", tier: "F", stars: 0, count });
export const createGem = (count: number): IItem => ({ id: "ot_gem", tier: "F", stars: 0, count });
export const createFood = (count: number): IItem => ({ id: "ot_food", tier: "F", stars: 0, count });
export const createXp = (count: number): IItem => ({ id: "ot_xp", tier: "F", stars: 0, count });
export const createMonsterScroll = (count: number): IItem => ({ id: "ot_monster_scroll", tier: "F", stars: 0, count });

export const goldId = game.item.id(createGold(0));
export const gemId = game.item.id(createGem(0));
export const foodId = game.item.id(createFood(0));
export const xpId = game.item.id(createXp(0));
export const monsterScrollId = game.item.id(createMonsterScroll(0));

/// Shop items \\\
export const shopSpecialOffer: IShopSpecialOffer = {
  asset: { emoji: "🗞" },
  name: "Monster Package",
  money: 8.88,
  items: [createMonsterScroll(1000), createGem(10000)],
};

export const shopPremium: IShopItem[] = [
  { item: createGem(1000), price: { money: 4 }, limit: 10 },
  { item: createGem(2500), price: { money: 6 }, limit: 10 },
  { item: createGem(5000), price: { money: 8 }, limit: 10 },
  { item: createGem(10000), price: { money: 10 }, limit: 10 },
];

export const shopGold: IShopItem[] = [

];

export const shopGem: IShopItem[] = [

];

export * as constants from "./constants";