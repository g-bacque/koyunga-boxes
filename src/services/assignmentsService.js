import { STORAGE_KEYS } from "../storage/storageKeys";
import { localStorageAdapter } from "../storage/localStorageAdapter";
import initialAssignments from "../data/assignments";

export const assignmentsService = {
  load() {
    return localStorageAdapter.get(
      STORAGE_KEYS.assignments,
      initialAssignments
    );
  },

  save(assignments) {
    localStorageAdapter.set(STORAGE_KEYS.assignments, assignments);
  },

  reset() {
    localStorageAdapter.remove(STORAGE_KEYS.assignments);
    return initialAssignments;
  },
};