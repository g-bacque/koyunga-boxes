import { useEffect, useState } from "react";
import { materialsService } from "../services/materialsService";
import { clientsService } from "../services/clientsService";
import { assignmentsService } from "../services/assignmentsService";
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

  useEffect(() => {
    materialsService.save(materials);
  }, [materials]);

  useEffect(() => {
    clientsService.save(clients);
  }, [clients]);

  useEffect(() => {
    assignmentsService.save(assignments);
  }, [assignments]);

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