import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Route = "shop" | "bag" | "campaign" | "map" | "events" | "any";

export interface AppStoreState {
  route: Route;

  segments: {}
  modals: {
    updateSW: { opened: boolean },
    monsterDetails: { opened: boolean, monsterId: string | undefined },
  }
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",

  segments: {},
  modals: {
    updateSW: { opened: false },
    monsterDetails: { opened: false, monsterId: undefined },
  },
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
