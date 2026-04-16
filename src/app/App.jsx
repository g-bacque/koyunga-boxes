import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";
import DashboardPage from "../pages/DashboardPage";
import InventoryPage from "../pages/InventoryPage";
import ClientsPage from "../pages/ClientsPage";
import ClientDetailPage from "../pages/ClientDetailPage";
import { useAppDataContext } from "../context/AppDataContext";
import Toast from "../components/common/Toast";
import { useEffect, useState } from "react";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedClient, setSelectedClient] = useState(null);

  const [toastState, setToastState] = useState({
  isOpen: false,
  type: "info",
  message: "",
});

const showToast = (type, message) => {
  setToastState({
    isOpen: true,
    type,
    message,
  });
};

const closeToast = () => {
  setToastState({
    isOpen: false,
    type: "info",
    message: "",
  });
};

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    type: null,
    result: null,
    expectedValue: "",
    title: "",
    message: "",
    inputLabel: "",
  });

  

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

  const closeDeleteModal = () => {
    setDeleteModalState({
      isOpen: false,
      type: null,
      result: null,
      expectedValue: "",
      title: "",
      message: "",
      inputLabel: "",
    });
  };

  const handleDeleteClient = (clientId) => {
    const result = prepareDeleteClient({
      clientId,
      selectedClient,
    });

    if (!result.success) {
      if (result.error === "CLIENT_HAS_ASSIGNED_MATERIALS") {
            showToast(
              "error",
              "No puedes eliminar este cliente porque todavía tiene materiales asignados."
            );
      }
      return;
    }

    const fullName = `${result.client.name} ${result.client.lastName}`.trim();

    setDeleteModalState({
      isOpen: true,
      type: "client",
      result,
      expectedValue: fullName,
      title: "Eliminar cliente",
      message:
        "Esta acción eliminará el cliente de la base de datos. Para confirmar, escribe su nombre completo.",
      inputLabel: "Nombre completo del cliente",
    });
  };



  const handleDeleteMaterial = (materialId) => {
    const result = prepareDeleteMaterial({ materialId });

    if (!result.success) {
      if (result.error === "MATERIAL_IS_ASSIGNED") {
            showToast(
              "error",
              "No puedes eliminar este material porque actualmente está asignado a un cliente."
            );
      }
      return;
    }

    setDeleteModalState({
      isOpen: true,
      type: "material",
      result,
      expectedValue: result.material.id,
      title: "Eliminar material",
      message:
        "Esta acción eliminará el material del inventario. Para confirmar, escribe su código exacto.",
      inputLabel: "Código del material",
    });
  };


const confirmDelete = () => {
  const { type, result } = deleteModalState;

  if (!result?.success) {
    closeDeleteModal();
    return;
  }

  if (type === "client") {
    applyDeleteClient(result);

    if (result.shouldClearSelectedClient) {
      setSelectedClient(null);
      setPage("clients");
    }

    showToast("success", "Cliente eliminado correctamente.");
  }

  if (type === "material") {
    applyDeleteMaterial(result);
    showToast("success", "Material eliminado correctamente.");
  }

  closeDeleteModal();
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

  useEffect(() => {
  if (!toastState.isOpen) return;

  const timer = setTimeout(() => {
    closeToast();
  }, 3000);

  return () => clearTimeout(timer);
}, [toastState.isOpen]);

  return (
    <>
      <div className="app-container">
        <Sidebar page={page} setPage={setPage} />
        <Header page={page} />
            <div className="page-container">
            {renderPage()}
            </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModalState.isOpen}
        title={deleteModalState.title}
        message={deleteModalState.message}
        expectedValue={deleteModalState.expectedValue}
        inputLabel={deleteModalState.inputLabel}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
        
      />
      <Toast
        isOpen={toastState.isOpen}
        type={toastState.type}
        message={toastState.message}
        onClose={closeToast}
      />
    </>
  );
}