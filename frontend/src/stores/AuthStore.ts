import create from "zustand";
import { devtools, combine } from "zustand/middleware";
import { StoreActions } from "@src/stores";

export type AuthStoreState = {
  id: string | null;
  role: string | null;
};

export type AuthStoreAction = {
  login: (role: Role) => void;
  logout: () => void;
};

export enum AuthStore {
  Name = "AuthStore",
  InitStore = "InitStore",
  Logout = "Logout",
}

const name = AuthStore.Name;
const initialState: AuthStoreState = {
  id: null,
  role: "",
};
const actions: StoreActions<AuthStoreState, AuthStoreAction> = (set) => ({
  login: (role: Role) =>
    set(
      () => ({
        id: crypto.randomUUID(),
        role,
      }),
      false,
      AuthStore.InitStore
    ),
  logout: () => {
    set(() => initialState, false, AuthStore.Logout);
  },
});
const useStore = create(devtools(combine(initialState, actions), { name }));

export function useAuth() {
  const state = useStore();

  return { ...state };
}
