import { iocDecorator } from "@force-dev/utils";
import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { createContext, useContext } from "react";

import { IPostsDataStore } from "./posts";
import { PrefetchStorePickKeys, TAppStore } from "./types";

export { AppStore };
export { RootContext };
export { useStore };
export { createStore };

enableStaticRendering(import.meta.env.SSR);

let store: AppStore | undefined = undefined;

export const IAppStore = iocDecorator<AppStore>();

@IAppStore({ inSingleton: true })
class AppStore {
  constructor(@IPostsDataStore() public postsDataStore: IPostsDataStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  hydrate(data: Record<string, unknown>) {
    Object.keys(data).forEach(key => {
      const k = key as PrefetchStorePickKeys<AppStore>;

      if (import.meta.env.DEV) {
        console.info(`hydrate ${k}`);
      }

      if (this[k]) {
        this[k]?.hydrate?.(data[k] as any);
      }
    });
  }

  dehydrate() {
    type Data = Record<PrefetchStorePickKeys<AppStore>, unknown>;
    const data: Partial<Data> = {};

    Object.keys(this).forEach(key => {
      const k = key as PrefetchStorePickKeys<AppStore>;

      data[k] = this[k]?.dehydrate?.();
    });

    return data as Data;
  }
}

const RootContext = createContext<TAppStore>(undefined as any);
const useStore = <T extends keyof TAppStore>(key: T): TAppStore[T] => {
  const root = useContext(RootContext);

  return root[key];
};

const createStore = () => {
  if (import.meta.env.SSR) {
    return IAppStore.getInstance();
  } else {
    store = store ?? IAppStore.getInstance();
  }

  return store;
};
