import { IPlayer } from "@game/core/player";
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
    username: "Username",
    level: 1,
    xp: 0,
    items: {
      "we_ancient_sword-F-1": { id: "we_ancient_sword", tier: "F", stars: 1, count: 1 },
      "ar_animal_skin_1-F-1": { id: "ar_animal_skin_1", tier: "F", stars: 1, count: 1 },
      "am_bone_gray-F-1": { id: "am_bone_gray", tier: "F", stars: 1, count: 1 },
      "ru_generic-F-1": { id: "ru_generic", tier: "F", stars: 1, count: 1 },
      "ri_agate-F-1": { id: "ri_agate", tier: "F", stars: 1, count: 1 },
      "ri_agate-S-1": { id: "ri_agate", tier: "S", stars: 1, count: 1 },
      "ri_agate-D-1": { id: "ri_agate", tier: "D", stars: 1, count: 1 },
    },
    monsters: {
      "angel-1-1": { id: "angel", level: 1, stars: 1, time: 1 },
    },
    lineup: [undefined, undefined, undefined, undefined, undefined, undefined],
    campaign: {
      id: "tree_of_life",
      stage: 0,
      tier: "F",
      lastFarmDate: Date.now(),
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