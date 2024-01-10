import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ApiStoreState {

}

export interface ApiStoreAction {
  reset: () => void;
}

const initialState: ApiStoreState = {

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