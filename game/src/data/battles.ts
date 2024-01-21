import { game } from "..";
import { IBattleData } from "../core/battle"
import { IItem } from "../core/item";
import { IMonster } from "../core/monster";
import { IPlayer } from "../core/player"
import { Content } from "../types/content";
import { MonsterLineup } from "../types/lineup";
import { MonsterId } from "./monsters";

function canCreate(player: IPlayer): boolean {
  return game.player.getLineup(player).filter(Boolean).length > 0;
}

function createCampaignBattleData(): IBattleData {
  return {
    getLineup(player) {
      const campaign = player.campaign.id;
      const tier = player.campaign.tier;
      const stage = player.campaign.stage;

      let monsterCount = 6;
      if (tier === "F" && campaign === "tree_of_life") monsterCount = Math.min(stage + 1, 6);

      const completedStages = game.campaign.getCompletedStages(tier, campaign, stage);
      const campaignIndex = game.campaign.campaignToIndex(campaign);

      const monsterLevel = completedStages + 1;
      const monsterStars = Math.min(campaignIndex + 1, 3);

      const lineup = Array(monsterCount).fill(0).map((_, i) => {
        const monsterId: MonsterId = game.random.percent(
          { seed: completedStages * i },
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
    },
    getRewards(player) {
      const campaign = player.campaign.id;
      const tier = player.campaign.tier;
      const stage = player.campaign.stage;

      const rewards: Content[] = [];

      // Add 1 to completed stages because stages start from 0, and 0 * x is 0
      const completedStages = game.campaign.getCompletedStages(tier, campaign, stage) + 1;

      const xp = Math.floor(game.player.levelToXp(completedStages) * 0.1);
      rewards.push({ item: game.constants.createXp(xp) });

      // Every 10th stage, give player a monster
      if (completedStages % 10 === 0) {
        const monster: IMonster = { id: "angel", stars: 1, level: 1, time: Date.now() }
        rewards.push({ monster });
      }
      // Every 5th stage, give player an item
      else if (completedStages % 5 === 0) {
        // Index will be either 0, 1, 2, 3, or 4. Each representing a different equipment.
        const index = ((completedStages / 5) - 1) % 5;
        let item: IItem | undefined = undefined;

        switch (index) {
          case 0: item = { id: "we_ancient_sword", tier, stars: 1, count: 1 }; break;
          case 1: item = { id: "ar_animal_skin_1", tier, stars: 1, count: 1 }; break;
          case 2: item = { id: "am_bone_gray", tier, stars: 1, count: 1 }; break;
          case 3: item = { id: "ru_generic", tier, stars: 1, count: 1 }; break;
          case 4: item = { id: "ri_agate", tier, stars: 1, count: 1 }; break;
          default: break;
        }

        if (item) rewards.push({ item });
      }

      return rewards;
    },
    canCreate,
    onCreate(player) {
      return {
        id: "campaign",
        ally: game.lineup.createBattleLineup(game.player.getLineup(player), "ally"),
        enemy: game.lineup.createBattleLineup(this.getLineup(player), "enemy"),
        turn: { count: 1, ally: [], enemy: [] },
        rewards: this.getRewards(player),
        animation: 0,
      }
    },
    onWin(player, battle) {
      // Add player battle reward contents
      game.actions.changePlayerContents.act(player, { toAdd: battle.rewards });

      // Increase the stage
      player.campaign.stage++;

      if (player.campaign.stage < game.constants.campaignStageCount) return;
      player.campaign.stage = 0;

      const campaignIndex = game.campaign.campaignToIndex(player.campaign.id);
      const tierIndex = game.tier.tierToIndex(player.campaign.tier);

      // Increase the campaign
      const nextCampaign = game.campaign.indexToCampaign(campaignIndex + 1);
      player.campaign.id = nextCampaign ?? player.campaign.id;

      if (!nextCampaign || campaignIndex >= tierIndex + 2) return;
      player.campaign.id = game.campaign.indexToCampaign(0) ?? "tree_of_life";

      // Increase the tier
      const nextTier = game.tier.indexToTier(tierIndex + 1);
      player.campaign.tier = nextTier ?? player.campaign.tier;
    },
  }
}

function createTowerBattleData(): IBattleData {
  return {
    getLineup(player) {
      const stage = player.map.tower.stage;

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
    },
    getRewards(player) {
      // Add 1 to stage as stage starts from 0
      const stage = player.map.tower.stage + 1;

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
    },
    canCreate,
    onCreate(player) {
      return {
        id: "tower",
        ally: game.lineup.createBattleLineup(game.player.getLineup(player), "ally"),
        enemy: game.lineup.createBattleLineup(this.getLineup(player), "enemy"),
        turn: { count: 1, ally: [], enemy: [] },
        rewards: this.getRewards(player),
        animation: 0,
      }
    },
    onWin(player, battle) {
      // Add player battle reward contents
      game.actions.changePlayerContents.act(player, { toAdd: battle.rewards });

      // Increase the stage
      player.map.tower.stage++;
    },
  }
}

export type BattleId = keyof typeof battles
export const battles = {
  campaign: createCampaignBattleData(),
  tower: createTowerBattleData(),
}