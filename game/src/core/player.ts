import { game } from "..";
import { CampaignId } from "../data/campaigns";
import { MonsterId } from "../data/monsters";
import { Content } from "../types/content";
import { Farm } from "../types/farm";
import { ItemTypeEquipment } from "../types/item_type";
import { BattleLineup, Lineup, MonsterLineup } from "../types/lineup";
import { Tier } from "../types/tier";
import { IBattle } from "./battle";
import { IItem } from "./item";
import { IMonster } from "./monster";

export interface IPlayer {
  id: string;
  username: string;

  level: number;
  xp: number;

  items: Record<string, IItem>;
  monsters: Record<string, IMonster>;

  lineup: Lineup;

  campaign: {
    id: CampaignId,
    stage: number,
    tier: Tier,
    lastFarmDate: number,
  };

  map: {
    tower: { stage: number },
  };

  events: {
    achievements: {},
    dailyQuests: {
      done: number,
      todo: number,
    },
  };
}

export function getItemsByType(player: IPlayer, type: ItemTypeEquipment): IItem[] {
  const keys = Object.keys(player.items).filter(k => k.startsWith(type.substring(0, 2)));
  const items = keys.map(key => player.items[key]).filter(Boolean) as IItem[];
  return items;
}

export function getBestItem(player: IPlayer, type: ItemTypeEquipment): IItem | undefined {
  const items = getItemsByType(player, type).map(item => ({ data: item, power: game.item.getPower(item) }));
  return items.sort((a, b) => b.power - a.power)[0]?.data;
}

export function getMonsterById(player: IPlayer | undefined, id: string | undefined): IMonster | undefined {
  if (player === undefined || id === undefined) return undefined;
  return player.monsters[id];
}

export function getMonsterLineup(player: IPlayer | undefined): MonsterLineup {
  return player?.lineup.map(m => getMonsterById(player, m)) as MonsterLineup;
}

export function getBattleLineup(player: IPlayer | undefined): BattleLineup {
  return game.lineup?.createBattleLineup(getMonsterLineup(player), "ally");
}

export function getCampaignFarm(player: IPlayer): Farm {
  let elapsed = Math.floor((Date.now() - player.campaign.lastFarmDate) / 1000);

  // Only allow max 8 hours of farming
  elapsed = Math.min(elapsed, 60 * 60 * 8);

  const amount = Math.floor(elapsed / 5);

  const farm = game.campaign.getCampaignFarm(
    player.campaign.tier,
    player.campaign.id,
    player.campaign.stage,
  );

  return {
    gold: farm.gold * amount,
    food: farm.food * amount,
    xp: farm.xp * amount,
  }
}

export function handleXp(level: number, xp: number): { level: number, xp: number } {
  let requiredXp = levelToXp(level);

  // Continue if more/equal xp to required xp and not max level
  while (xp >= requiredXp && level < game.constants.maxLevel) {
    level++;
    xp -= requiredXp;
    requiredXp = levelToXp(level);
  }

  return { level, xp };
}

export function levelToXp(level: number): number {
  return Math.floor(game.constants.playerLevelToXpBase + level + game.maths.curve(level));
}

/// Tower stuff \\\
export function createTowerBattle(player: IPlayer): IBattle {
  const campaignLineup = getTowerLineup(player.map.tower.stage);
  const campaignRewards = getTowerRewards(player.map.tower.stage);

  return {
    type: "tower",
    ally: game.player.getBattleLineup(player),
    enemy: game.lineup.createBattleLineup(campaignLineup, "enemy"),
    turn: { count: 1, ally: [], enemy: [] },
    rewards: campaignRewards,
    animation: 0,
  }
}

export function getTowerLineup(stage: number): MonsterLineup {
  const monsterCount = 6;
  const monsterLevel = stage + 1;
  const monsterStars = 1;

  const lineup = Array(monsterCount).fill(0).map((_, i) => {
    const monsterId: MonsterId = game.random.percent(
      { seed: stage * i },
      Object.keys(game.monsters).map(result => ({ percent: 1, result: result as MonsterId }))
    ) || "angel";

    return {
      id: monsterId,
      level: monsterLevel,
      stars: monsterStars,
      time: i,
    }
  }) as MonsterLineup;

  return lineup;
}

export function getTowerRewards(stage: number): Content[] {
  // Add 1 to stage as stage starts from 0
  stage += 1;

  const rewards: Content[] = [];

  const gold = Math.floor(stage * 1000);
  rewards.push({ item: game.constants.createGold(gold) });

  // Every 10th stage, give player a monster
  if (stage % 10 === 0) {
    const monster: IMonster = { id: "angel", stars: 1, level: 1, time: Date.now() }
    rewards.push({ monster });
  }
  // Every 5th stage, give player an item
  else if (stage % 5 === 0) {
    // Index will be either 0, 1, 2, 3, or 4. Each representing a different equipment.
    const index = ((stage / 5) - 1) % 5;
    let item: IItem | undefined = undefined;

    switch (index) {
      case 0: item = { id: "we_ancient_sword", tier: "F", stars: 1, count: 1 }; break;
      case 1: item = { id: "ar_animal_skin_1", tier: "F", stars: 1, count: 1 }; break;
      case 2: item = { id: "am_bone_gray", tier: "F", stars: 1, count: 1 }; break;
      case 3: item = { id: "ru_generic", tier: "F", stars: 1, count: 1 }; break;
      case 4: item = { id: "ri_agate", tier: "F", stars: 1, count: 1 }; break;
      default: break;
    }

    if (item) rewards.push({ item });
  }

  return rewards;
}

export * as player from "./player";