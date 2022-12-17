import { AppStore } from "./index";

export type { IAppStore };
export type { PrefetchStore };
export type { PrefetchStorePickKeys };

type IAppStore = Omit<AppStore, keyof PrefetchStore<any>>;

type PrefetchStore<State> = {
  hydrate(state: State): void;
  dehydrate(): State | undefined;
};

type PrefetchStorePickKeys<T> = {
  [K in keyof T]: T[K] extends PrefetchStore<unknown> ? K : never;
}[keyof T];
