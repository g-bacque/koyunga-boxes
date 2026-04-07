import { useState } from "react";
import ClientTable from "../components/clients/ClientTable";
import AddClientForm from "../components/clients/AddClientForm";
import "./ClientsPage.css";

export default function ClientsPage({
  clients,
  setClients,
  onSelectClient,
  onDeleteClient,
}) {
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
        <div>
          <h1 className="clients-page-title">Clientes</h1>
          <p className="clients-page-description">
            Listado de clientes del centro.
          </p>
        </div>

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