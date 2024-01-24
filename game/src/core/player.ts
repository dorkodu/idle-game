import { game } from "..";
import { AchievementId } from "../data/achievements";
import { CampaignId } from "../data/campaigns";
import { DailyQuestId } from "../data/daily_quests";
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

  lineup: Lineup;

  items: Record<string, IItem>;
  monsters: Record<string, IMonster>;

  shop: {
    /**
     * Used for handling buy limits. Over-written when shop get an update.
     */
    snapshot: number;

    /** Usage: premium[shopItemIndex] -> boughtAmount */
    premium: Record<number, number>;

    /** Usage: gold[shopItemIndex] -> boughtAmount */
    gold: Record<number, number>;

    /** Usage: gem[shopItemIndex] -> boughtAmount */
    gem: Record<number, number>;
  }

  campaign: {
    id: CampaignId,
    stage: number,
    tier: Tier,
    lastFarmDate: number,
  };

  map: {
    tower: { stage: number },
    arena: {
      /** Date is used to generate arena battles */
      dates: [number, number, number];
    },
  };

  events: {
    dailyQuests: {
      startDate: number;

      /** Usage: progress[DailyQuestId] -> number */
      progress: Partial<Record<DailyQuestId, number>>;

      /** Usage: collected[DailyQuestId] -> boolean */
      collected: Partial<Record<DailyQuestId, boolean>>;
    },
    achievements: {
      /** Usage: progress[AchievementId] -> number */
      progress: Partial<Record<AchievementId, number>>;

      /** Usage: collected[DailyQuestId] -> boolean */
      collected: Partial<Record<AchievementId, boolean>>;
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