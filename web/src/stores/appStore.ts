import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface AppStoreState {
  online: boolean;
  route: "home" | "dashboard" | "any";

  loading: {
    auth: boolean;
  }

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
  online: false,
  route: "any",

  loading: {
    auth: true,
  },

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
