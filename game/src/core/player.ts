import { game } from "..";
import { CampaignId } from "../data/campaigns";
import { Farm } from "../types/farm";
import { ItemTypeEquipment } from "../types/item_type";
import { Lineup, MonsterLineup } from "../types/lineup";
import { Tier } from "../types/tier";
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

export function getLineup(player: IPlayer | undefined): MonsterLineup {
  return player?.lineup.map(m => getMonsterById(player, m)) as MonsterLineup;
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

export * as player from "./player";