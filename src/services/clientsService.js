import { STORAGE_KEYS } from "../storage/storageKeys";
import { localStorageAdapter } from "../storage/localStorageAdapter";
import initialClients from "../data/clients";

export const clientsService = {
  load() {
    return localStorageAdapter.get(STORAGE_KEYS.clients, initialClients);
  },

  save(clients) {
    localStorageAdapter.set(STORAGE_KEYS.clients, clients);
  },

  reset() {
    localStorageAdapter.remove(STORAGE_KEYS.clients);
    return initialClients;
  },
};