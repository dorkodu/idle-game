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
export const createMonsterScroll = (stars: number, count: number): IItem => ({ id: "ot_monster_scroll", tier: "F", stars, count });
export const createArenaTrophy = (count: number): IItem => ({ id: "ot_arena_trophy", tier: "F", stars: 0, count });
export const createWheelSpinToken = (count: number): IItem => ({ id: "ot_wheel_spin_token", tier: "F", stars: 0, count });

export const goldId = game.item.id(createGold(0));
export const gemId = game.item.id(createGem(0));
export const foodId = game.item.id(createFood(0));
export const xpId = game.item.id(createXp(0));
export const arenaTrophyId = game.item.id(createArenaTrophy(0));
export const wheelSpinTokenId = game.item.id(createWheelSpinToken(0));

/// Shop \\\
/** Obtained by Date.now(), must be changed on every shop update. */
export const shopSnapshot = 1705908399559;

export const shopSpecialOffer: IShopSpecialOffer = {
  asset: { emoji: "🗞" },
  name: "Monster Package",
  money: 8.88,
  items: [createMonsterScroll(5, 100), createGem(10000)],
};

export const shopPremium: IShopItem[] = [
  { item: createGem(1000), price: { money: 4 }, limit: 10 },
  { item: createGem(2500), price: { money: 6 }, limit: 10 },
  { item: createGem(5000), price: { money: 8 }, limit: 10 },
  { item: createGem(10000), price: { money: 10 }, limit: 10 },
];

export const shopGold: IShopItem[] = [
  { item: createGem(1000), price: { gold: 4 }, limit: 10 },
  { item: createGem(2500), price: { gold: 6 }, limit: 10 },
  { item: createGem(5000), price: { gold: 8 }, limit: -1 },
  { item: createGem(10000), price: { gold: 10 }, limit: 10 },
];

export const shopGem: IShopItem[] = [
  { item: createGem(1000), price: { gem: 4 }, limit: 10 },
  { item: createGem(2500), price: { gem: 6 }, limit: 10 },
  { item: createGem(5000), price: { gem: 8 }, limit: 10 },
  { item: createGem(10000), price: { gem: 10 }, limit: 10 },
];

export * as constants from "./constants";