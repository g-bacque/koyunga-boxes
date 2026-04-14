export function deleteClientData({
  clientId,
  clients,
  materials,
  assignments,
  selectedClient,
}) {
  const clientToDelete = clients.find((client) => client.id === clientId);

  if (!clientToDelete) {
    return {
      success: false,
      error: "CLIENT_NOT_FOUND",
    };
  }

  const clientHasAssignedMaterials = materials.some(
    (material) => material?.currentClientId === clientId
  );

  if (clientHasAssignedMaterials) {
    return {
      success: false,
      error: "CLIENT_HAS_ASSIGNED_MATERIALS",
      client: clientToDelete,
    };
  }

  const updatedClients = clients.filter((client) => client.id !== clientId);
  const updatedAssignments = assignments.filter(
    (assignment) => assignment.clientId !== clientId
  );

  const shouldClearSelectedClient = selectedClient?.id === clientId;

  return {
    success: true,
    updatedClients,
    updatedAssignments,
    shouldClearSelectedClient,
    client: clientToDelete,
  };
}

export function deleteMaterialData({
  materialId,
  materials,
  assignments,
}) {
  const materialToDelete = materials.find(
    (material) => material?.id === materialId
  );

  if (!materialToDelete) {
    return {
      success: false,
      error: "MATERIAL_NOT_FOUND",
    };
  }

  if (materialToDelete.status === "assigned") {
    return {
      success: false,
      error: "MATERIAL_IS_ASSIGNED",
      material: materialToDelete,
    };
  }

  const updatedMaterials = materials.filter(
    (material) => material?.id !== materialId
  );

  const updatedAssignments = assignments.map((assignment) => ({
    ...assignment,
    materialIds: assignment.materialIds.filter((id) => id !== materialId),
  }));

  return {
    success: true,
    updatedMaterials,
    updatedAssignments,
    material: materialToDelete,
  };
}