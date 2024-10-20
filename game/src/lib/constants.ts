import { game } from "..";
import { IItem } from "../core/item";
import { IShopItem, IShopSpecialOffer } from "../types/shop";
import { Tier } from "../types/tier";

/* Current version of the game. Must be change after each game update. */
export const version = "0.1.0";

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
export const createItemBox = (tier: Tier, stars: number, count: number): IItem => ({ id: "ot_item_box", tier, stars, count });
export const createArenaTrophy = (count: number): IItem => ({ id: "ot_arena_trophy", tier: "F", stars: 0, count });
export const createWheelSpinToken = (count: number): IItem => ({ id: "ot_wheel_spin_token", tier: "F", stars: 0, count });

export const goldId = game.item.id(createGold(0));
export const gemId = game.item.id(createGem(0));
export const foodId = game.item.id(createFood(0));
export const xpId = game.item.id(createXp(0));
export const arenaTrophyId = game.item.id(createArenaTrophy(0));
export const wheelSpinTokenId = game.item.id(createWheelSpinToken(0));

/// Shop \\\
export const shopSpecialOffer: IShopSpecialOffer = {
  asset: { emoji: "📜" },
  name: "Monster Package",
  money: 8.88,
  items: [createMonsterScroll(5, 100), createGem(10000)],
};

export const shopPremium: IShopItem[] = [
  { item: createGem(1_000), price: { money: 4 }, limit: 10 },
  { item: createGem(2_500), price: { money: 6 }, limit: 10 },
  { item: createGem(5_000), price: { money: 8 }, limit: 10 },
  { item: createGem(10_000), price: { money: 10 }, limit: 10 },
];

export const shopGold: IShopItem[] = [
  { item: createFood(1_000), price: { gold: 1_000 }, limit: 10 },
  { item: createFood(100_000), price: { gold: 100_000 }, limit: 10 },
  { item: createFood(1_000_000), price: { gold: 1_000_000 }, limit: 10 },

  ...[...Array(5).keys()].map(i =>
    ({ item: createMonsterScroll(i + 1, 1), price: { gold: 10_000 * (i + 1) }, limit: 10 })
  ),

  ...[...Array(5).keys()].map(i =>
    ({ item: createItemBox("F", i + 1, 1), price: { gold: 10_000 * (i + 1) }, limit: 10 })
  ),
];

export const shopGem: IShopItem[] = [
  { item: createGold(1_000), price: { gem: 10 }, limit: 10 },
  { item: createGold(100_000), price: { gem: 100 }, limit: 10 },
  { item: createGold(1_000_000), price: { gem: 250 }, limit: 10 },

  { item: createFood(1_000), price: { gem: 10 }, limit: 10 },
  { item: createFood(100_000), price: { gem: 100 }, limit: 10 },
  { item: createFood(1_000_000), price: { gem: 250 }, limit: 10 },

  ...[...Array(5).keys()].map(i =>
    ({ item: createMonsterScroll(i + 1, i), price: { gem: 50 * (i + 1) }, limit: -1 })
  ),

  ...[...Array(5).keys()].map(i =>
    ({ item: createItemBox("F", i + 1, i), price: { gem: 50 * (i + 1) }, limit: -1 })
  ),
];

export * as constants from "./constants";