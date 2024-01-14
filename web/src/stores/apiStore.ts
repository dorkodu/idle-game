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
    items: {},
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