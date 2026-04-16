import { useEffect, useState } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { materialsService } from "../services/materialsService";
import { materialsSqliteService } from "../services/materialsSqliteService";
import { clientsService } from "../services/clientsService";
import { clientsSqliteService } from "../services/clientsSqliteService";
import { assignmentsService } from "../services/assignmentsService";
import { assignmentsSqliteService } from "../services/assignmentsSqliteService";
import { ensureDBInitialized } from "../services/dbInit";
import {
  deleteClientData,
  deleteMaterialData,
} from "../services/appDataActions";

export function useAppData() {
  const [materials, setMaterials] = useState(() => materialsService.load());
  const [clients, setClients] = useState(() => clientsService.load());
  const [assignments, setAssignments] = useState(() =>
    assignmentsService.load()
  );

  const [storageHydrated, setStorageHydrated] = useState(!isTauri());

  useEffect(() => {
    let cancelled = false;

    async function hydrateFromStorage() {
      if (!isTauri()) {
        setStorageHydrated(true);
        return;
      }

      try {
        await ensureDBInitialized();

        const [sqliteMaterials, sqliteClients, sqliteAssignments] =
          await Promise.all([
            materialsSqliteService.load(),
            clientsSqliteService.load(),
            assignmentsSqliteService.load(),
          ]);

        if (cancelled) return;

        setMaterials(sqliteMaterials);
        setClients(sqliteClients);
        setAssignments(sqliteAssignments);
      } catch (error) {
        console.error("Error hydrating app data from SQLite:", error);
      } finally {
        if (!cancelled) {
          setStorageHydrated(true);
        }
      }
    }

    hydrateFromStorage();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    async function saveMaterials() {
      if (!storageHydrated) return;

      try {
        if (isTauri()) {
          await materialsSqliteService.saveAll(materials);
        } else {
          materialsService.save(materials);
        }
      } catch (error) {
        console.error("Error saving materials:", error);
      }
    }

    saveMaterials();
  }, [materials, storageHydrated]);

  useEffect(() => {
    async function saveClients() {
      if (!storageHydrated) return;

      try {
        if (isTauri()) {
          await clientsSqliteService.saveAll(clients);
        } else {
          clientsService.save(clients);
        }
      } catch (error) {
        console.error("Error saving clients:", error);
      }
    }

    saveClients();
  }, [clients, storageHydrated]);

  useEffect(() => {
    async function saveAssignments() {
      if (!storageHydrated) return;

      try {
        if (isTauri()) {
          await assignmentsSqliteService.saveAll(assignments);
        } else {
          assignmentsService.save(assignments);
        }
      } catch (error) {
        console.error("Error saving assignments:", error);
      }
    }

    saveAssignments();
  }, [assignments, storageHydrated]);

  const prepareDeleteClient = ({ clientId, selectedClient }) => {
    return deleteClientData({
      clientId,
      clients,
      materials,
      assignments,
      selectedClient,
    });
  };

  const applyDeleteClient = (result) => {
    if (!result?.success) return;

    setClients(result.updatedClients);
    setAssignments(result.updatedAssignments);
  };

  const prepareDeleteMaterial = ({ materialId }) => {
    return deleteMaterialData({
      materialId,
      materials,
      assignments,
    });
  };

  const applyDeleteMaterial = (result) => {
    if (!result?.success) return;

    setMaterials(result.updatedMaterials);
    setAssignments(result.updatedAssignments);
  };

  return {
    materials,
    setMaterials,
    clients,
    setClients,
    assignments,
    setAssignments,
    prepareDeleteClient,
    applyDeleteClient,
    prepareDeleteMaterial,
    applyDeleteMaterial,
  };
}