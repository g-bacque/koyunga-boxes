import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import ClientsPage from "../pages/ClientsPage";
import ClientDetailPage from "../pages/ClientDetailPage";
import initialMaterials from "../data/materials";
import initialAssignments from "../data/assignments";
import initialClients from "../data/clients";
import {
  STORAGE_KEYS,
  getStoredData,
  setStoredData,
} from "../services/storage";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);

  const [materials, setMaterials] = useState(() =>
    getStoredData(STORAGE_KEYS.materials, initialMaterials)
  );

  const [assignments, setAssignments] = useState(() =>
    getStoredData(STORAGE_KEYS.assignments, initialAssignments)
  );

  const [clients, setClients] = useState(() =>
    getStoredData(STORAGE_KEYS.clients, initialClients)
  );

  useEffect(() => {
    setStoredData(STORAGE_KEYS.materials, materials);
  }, [materials]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.assignments, assignments);
  }, [assignments]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.clients, clients);
  }, [clients]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setPage("client-detail");
  };

  const handleBackFromClientDetail = () => {
    setSelectedClient(null);
    setPage("clients");
  };

  const handleDeleteClient = (clientId) => {
    const clientToDelete = clients.find((client) => client.id === clientId);

    if (!clientToDelete) return;

    const clientHasAssignedMaterials = materials.some(
      (material) => material.currentClientId === clientId
    );

    if (clientHasAssignedMaterials) {
      alert(
        "No puedes eliminar este cliente porque todavía tiene materiales asignados."
      );
      return;
    }

    const fullName = `${clientToDelete.name} ${clientToDelete.lastName}`.trim();

    const confirmation = prompt(
      `Para eliminar este cliente, escribe su nombre completo:\n${fullName}`
    );

    if (confirmation !== fullName) {
      alert("El nombre no coincide. El cliente no se ha eliminado.");
      return;
    }

    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== clientId)
    );

    setAssignments((prevAssignments) =>
      prevAssignments.filter((assignment) => assignment.clientId !== clientId)
    );

    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
      setPage("clients");
    }
  };

  const handleDeleteMaterial = (materialId) => {
    const materialToDelete = materials.find(
      (material) => material.id === materialId
    );

    if (!materialToDelete) return;

    if (materialToDelete.status === "assigned") {
      alert(
        "No puedes eliminar este material porque actualmente está asignado a un cliente."
      );
      return;
    }

    const confirmation = prompt(
      `Para eliminar este material, escribe su código:\n${materialToDelete.id}`
    );

    if (confirmation !== materialToDelete.id) {
      alert("El código no coincide. El material no se ha eliminado.");
      return;
    }

    setMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material.id !== materialId)
    );

    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => ({
        ...assignment,
        materialIds: assignment.materialIds.filter((id) => id !== materialId),
      }))
    );
  };

  const renderPage = () => {
    switch (page) {
      case "inventory":
        return (
          <InventoryPage
            materials={materials}
            setMaterials={setMaterials}
            clients={clients}
            onDeleteMaterial={handleDeleteMaterial}
          />
        );

      case "clients":
        return (
          <ClientsPage
            clients={clients}
            setClients={setClients}
            onSelectClient={handleSelectClient}
            onDeleteClient={handleDeleteClient}
          />
        );

      case "client-detail":
        return (
          <ClientDetailPage
            client={selectedClient}
            onBack={handleBackFromClientDetail}
            materials={materials}
            setMaterials={setMaterials}
            assignments={assignments}
            setAssignments={setAssignments}
          />
        );

      default:
        return <DashboardPage materials={materials} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar page={page} setPage={setPage} />
      <div className="flex-1 flex flex-col">
        <Header page={page} />
        <div className="p-6">{renderPage()}</div>
      </div>
    </div>
  );
}