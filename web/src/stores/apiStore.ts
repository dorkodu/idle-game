import { IItem } from "@game/core/item";
import { IMonster } from "@game/core/monster";
import { IPlayer } from "@game/core/player";
import { ItemId } from "@game/data/items";
import { MonsterId } from "@game/data/monsters";
import { game } from "@game/index";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const items: Record<string, IItem> = {};
const monsters: Record<string, IMonster> = {};

Object.keys(game.items).forEach((id, i) => {
  const item: IItem = { id: id as ItemId, count: 1, tier: game.tier.indexToTier(i % 7) ?? "F", stars: 1 };
  items[game.item.id(item)] = item;
});

Object.keys(game.monsters).forEach((id) => {
  const monster: IMonster = { id: id as MonsterId, level: 1, stars: 1, time: Date.now() };
  monsters[game.monster.id(monster)] = monster;
});

export interface ApiStoreState {
  player: IPlayer | undefined;
}

export interface ApiStoreAction {
  reset: () => void;
}

const initialState: ApiStoreState = {
  player: {
    id: "0",
    username: "Username",
    level: 1,
    xp: 0,
    items: items,
    monsters: monsters,
    campaign: {
      id: "tree_of_life",
      stage: 0,
      tier: "F",
      lastFarmDate: Date.now(),
      lineup: [undefined, undefined, undefined, undefined, undefined, undefined],
    },
    map: {
      tower: { stage: 0 },
    },
    events: {
      achievements: {},
      dailyQuests: {},
    },
  },
}

export const useApiStore = create<ApiStoreState & ApiStoreAction>()(
  immer(
    //persist(
    (set, _get) => ({
      ...initialState,

      reset() {
        set(initialState);
      },
    }),
    //{
    //  name: "api-store"
    //}
  )
  //)
);