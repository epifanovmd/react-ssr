import { ThemeStore } from "../theme";
import { AppStore } from "./index";

export type { TAppStore };
export type { PrefetchStore };
export type { PrefetchStorePickKeys };

type TAppStore = Omit<AppStore, keyof PrefetchStore<any>> & {
  theme: ThemeStore;
};

type PrefetchStore<State> = {
  hydrate(state: State): void;
  dehydrate(): State | undefined;
};

type PrefetchStorePickKeys<T> = {
  [K in keyof T]: T[K] extends PrefetchStore<unknown> ? K : never;
}[keyof T];
