import { IBattle } from "@game/core/battle";
import { IItem } from "@game/core/item";
import { BattleId } from "@game/data/battles";
import { IContent } from "@game/types/content";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Route = "shop" | "bag" | "campaign" | "map" | "events" | "any";

export interface AppStoreState {
  route: Route;

  segments: {}
  modals: {
    updateSW: { opened: boolean },

    lineup: {
      opened: boolean;
      battleId: BattleId | undefined;
    }

    itemDetails: {
      opened: boolean,
      item: IItem | undefined,
    },

    monsterDetails: {
      opened: boolean,
      monsterId: string | undefined,
    },

    battle: {
      opened: boolean;
      speed: number;
      battle: IBattle | undefined;
    },

    contentList: {
      opened: boolean,
      contents: IContent[],

      onClick?: (id: string) => void,

      removeable?: boolean,
      onRemove?: () => void,

      notice?: string,
    },
  }
}

export interface AppStoreAction {

}

const initialState: AppStoreState = {
  route: "any",

  segments: {},
  modals: {
    updateSW: { opened: false },
    lineup: { opened: false, battleId: undefined },
    itemDetails: { opened: false, item: undefined },
    monsterDetails: { opened: false, monsterId: undefined },
    battle: { opened: false, speed: 1, battle: undefined },
    contentList: { opened: false, contents: [] },
  },
}

export const useAppStore = create(
  immer<AppStoreState & AppStoreAction>((_set, _get) => ({
    ...initialState,
  }))
);
