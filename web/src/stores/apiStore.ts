import { IPlayer } from "@game/core/player";
import { game } from "@game/index";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ApiStoreState {
  player: IPlayer | undefined;
}

export interface ApiStoreAction {
  reset: () => void;
}

const initialState: ApiStoreState = {
  player: {
    id: "0",
    username: "Player",
    level: 1,
    xp: 0,
    lineup: [undefined, undefined, undefined, undefined, undefined, undefined],
    items: {
      "we_ancient_sword-F-1": { id: "we_ancient_sword", tier: "F", stars: 1, count: 1 },
      "ar_animal_skin_1-F-1": { id: "ar_animal_skin_1", tier: "F", stars: 1, count: 1 },
      "am_bone_gray-F-1": { id: "am_bone_gray", tier: "F", stars: 1, count: 1 },
      "ru_generic-F-1": { id: "ru_generic", tier: "F", stars: 1, count: 1 },
      //"ri_agate-F-1": { id: "ri_agate", tier: "F", stars: 1, count: 1 },

      "ri_agate-S-1": { id: "ri_agate", tier: "S", stars: 1, count: 1 },
      "ri_agate-A-1": { id: "ri_agate", tier: "A", stars: 1, count: 1 },
      "ri_agate-B-1": { id: "ri_agate", tier: "B", stars: 1, count: 1 },
      "ri_agate-C-1": { id: "ri_agate", tier: "C", stars: 1, count: 1 },
      "ri_agate-D-1": { id: "ri_agate", tier: "D", stars: 1, count: 1 },
      "ri_agate-E-1": { id: "ri_agate", tier: "E", stars: 1, count: 5 },
      "ri_agate-F-5": { id: "ri_agate", tier: "F", stars: 5, count: 3 },

      "ot_monster_scroll-F-1": { id: "ot_monster_scroll", tier: "F", stars: 1, count: 5 },
      "ot_monster_scroll-F-5": { id: "ot_monster_scroll", tier: "F", stars: 5, count: 5 },
      "ot_item_box-S-2": { id: "ot_item_box", tier: "S", stars: 2, count: 5 },
      "ot_item_box-B-3": { id: "ot_item_box", tier: "B", stars: 3, count: 5 },
    },
    monsters: {
      "angel-1-1": { id: "angel", level: 1, stars: 1, time: 1 },
    },
    shop: {
      snapshot: game.constants.version,
      startDate: Date.now(),
      premium: {},
      gold: {},
      gem: {},
    },
    campaign: {
      id: "tree_of_life",
      stage: 0,
      tier: "F",
      lastFarmDate: Date.now(),
    },
    map: {
      tower: { stage: 0 },
      arena: { dates: [0, 1, 2] },
    },
    events: {
      achievements: {
        progress: {},
        collected: {},
      },
      dailyQuests: {
        startDate: Date.now(),
        progress: {},
        collected: {},
      },
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