import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import ClientsPage from "../pages/ClientsPage";
import ClientDetailPage from "../pages/ClientDetailPage";
import { useAppDataContext } from "../context/AppDataContext";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);

  const {
    prepareDeleteClient,
    applyDeleteClient,
    prepareDeleteMaterial,
    applyDeleteMaterial,
  } = useAppDataContext();

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setPage("client-detail");
  };

  const handleBackFromClientDetail = () => {
    setSelectedClient(null);
    setPage("clients");
  };

  const handleDeleteClient = (clientId) => {
    const result = prepareDeleteClient({
      clientId,
      selectedClient,
    });

    if (!result.success) {
      if (result.error === "CLIENT_HAS_ASSIGNED_MATERIALS") {
        alert(
          "No puedes eliminar este cliente porque todavía tiene materiales asignados."
        );
      }
      return;
    }

    const fullName = `${result.client.name} ${result.client.lastName}`.trim();

    const confirmation = prompt(
      `Para eliminar este cliente, escribe su nombre completo:\n${fullName}`
    );

    if (confirmation !== fullName) {
      alert("El nombre no coincide. El cliente no se ha eliminado.");
      return;
    }

    applyDeleteClient(result);

    if (result.shouldClearSelectedClient) {
      setSelectedClient(null);
      setPage("clients");
    }
  };

  const handleDeleteMaterial = (materialId) => {
    const result = prepareDeleteMaterial({ materialId });

    if (!result.success) {
      if (result.error === "MATERIAL_IS_ASSIGNED") {
        alert(
          "No puedes eliminar este material porque actualmente está asignado a un cliente."
        );
      }
      return;
    }

    const confirmation = prompt(
      `Para eliminar este material, escribe su código:\n${result.material.id}`
    );

    if (confirmation !== result.material.id) {
      alert("El código no coincide. El material no se ha eliminado.");
      return;
    }

    applyDeleteMaterial(result);
  };

  const renderPage = () => {
    switch (page) {
      case "inventory":
        return <InventoryPage onDeleteMaterial={handleDeleteMaterial} />;

      case "clients":
        return (
          <ClientsPage
            onSelectClient={handleSelectClient}
            onDeleteClient={handleDeleteClient}
          />
        );

      case "client-detail":
        return (
          <ClientDetailPage
            client={selectedClient}
            onBack={handleBackFromClientDetail}
          />
        );

      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar page={page} setPage={setPage} />
      <Header page={page} />
      <div className="page-container">{renderPage()}</div>
    </div>
  );
}