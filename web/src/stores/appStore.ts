import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Route = "shop" | "bag" | "campaign" | "map" | "events" | "any";

export interface AppStoreState {
  route: Route;

  segments: {}
  modals: {
    updateSW: {
      opened: boolean;
    }
  }
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",

  segments: {},
  modals: {
    updateSW: { opened: false },
  },
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
