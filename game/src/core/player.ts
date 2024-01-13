import { CampaignId } from "../data/campaigns";
import { Lineup } from "../types/lineup";
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

  campaign: {
    id: CampaignId,
    stage: number,
    tier: Tier,
    lastFarmDate: number,

    lineup: Lineup,
  };

  map: {
    tower: { stage: number },
  };

  events: {
    achievements: {},
    dailyQuests: {},
  };
}

export * as player from "./player";