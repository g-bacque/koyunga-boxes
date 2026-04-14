import { useState } from "react";
import ClientTable from "../components/clients/ClientTable";
import AddClientForm from "../components/clients/AddClientForm";
import { useAppDataContext } from "../context/AppDataContext";
import "./ClientsPage.css";

export default function ClientsPage({
  onSelectClient,
  onDeleteClient,
}) {
  const { clients = [], setClients } = useAppDataContext();
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  const handleToggleAddClientForm = () => {
    setShowAddClientForm((prev) => !prev);
  };

  const handleClientAdded = () => {
    setShowAddClientForm(false);
  };

  return (
    <div className="clients-page">
      <div className="clients-page-header">
        <button
          className="clients-page-action-button"
          onClick={handleToggleAddClientForm}
        >
          {showAddClientForm ? "Cerrar formulario" : "Añadir cliente"}
        </button>
      </div>

      {showAddClientForm && (
        <AddClientForm
          setClients={setClients}
          onClientAdded={handleClientAdded}
        />
      )}

      <ClientTable
        clients={clients}
        onSelectClient={onSelectClient}
        onDeleteClient={onDeleteClient}
      />
    </div>
  );
}