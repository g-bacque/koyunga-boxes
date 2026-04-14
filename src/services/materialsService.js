import { STORAGE_KEYS } from "../storage/storageKeys";
import { localStorageAdapter } from "../storage/localStorageAdapter";
import initialMaterials from "../data/materials";

export const materialsService = {
  load() {
    return localStorageAdapter.get(STORAGE_KEYS.materials, initialMaterials);
  },

  save(materials) {
    localStorageAdapter.set(STORAGE_KEYS.materials, materials);
  },

  reset() {
    localStorageAdapter.remove(STORAGE_KEYS.materials);
    return initialMaterials;
  },
};