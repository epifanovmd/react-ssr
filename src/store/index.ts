import { UsersDataStore } from "./users";
import { createContext, useContext } from "react";
import { enableStaticRendering } from "mobx-react-lite";
import { IAppStore, PrefetchStorePickKeys } from "./types";

export { AppStore };
export { RootContext };
export { useStore };
export { createStore };

enableStaticRendering(import.meta.env.SSR);

let store: AppStore | undefined = undefined;

class AppStore {
  usersDataStore = new UsersDataStore();

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

const RootContext = createContext<IAppStore>(undefined as any);
const useStore = <T extends keyof IAppStore>(key: T): AppStore[T] => {
  const root = useContext(RootContext);

  return root[key];
};

const createStore = () => {
  if (import.meta.env.SSR) {
    return new AppStore();
  } else {
    store = store ?? new AppStore();
  }

  return store;
};
