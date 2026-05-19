import kvStore from "expo-sqlite/kv-store";
import { Platform } from "react-native";

const nativeStorage = {
  getItem: (key: string) => kvStore.getItemSync(key),
  setItem: (key: string, value: string) => kvStore.setItemSync(key, value),
  removeItem: (key: string) => kvStore.removeItemSync(key),
};

const webStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};

export const kvStorage = Platform.OS === "web" ? webStorage : nativeStorage;
