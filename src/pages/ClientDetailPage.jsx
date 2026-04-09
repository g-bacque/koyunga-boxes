import { useState } from "react";
import ClientCurrentMaterials from "../components/clients/ClientCurrentMaterials";
import ClientHistory from "../components/clients/ClientHistory";
import AssignMaterialsForm from "../components/assignments/AssignMaterialsForm";
import ReturnMaterialsForm from "../components/assignments/ReturnMaterialsForm";
import "./ClientDetailPage.css";

export default function ClientDetailPage({
  client,
  onBack,
  materials,
  setMaterials,
  assignments,
  setAssignments,
}) {
  const [activeAction, setActiveAction] = useState(null);

  if (!client) return null;

  const toggleAction = (action) => {
    setActiveAction((prev) => (prev === action ? null : action));
  };

  return (
    <div className="client-detail-page">
      <button className="client-detail-back-button" onClick={onBack}>
        ← Volver a clientes
      </button>

      <div className="client-detail-header">
        <div>
          <h1 className="client-detail-page-title">
            {client.name} {client.lastName}
          </h1>
          <p className="client-detail-page-subtitle">
            Consulta materiales actuales e historial del cliente
          </p>
        </div>
      </div>

      <section className="client-detail-section card">
        <h2 className="client-detail-section-title">Datos del cliente</h2>

        <div className="client-detail-info-grid">
          <div className="client-detail-info-item">
            <span className="client-detail-info-label">ID</span>
            <span className="client-detail-info-value">{client.id}</span>
          </div>

          <div className="client-detail-info-item">
            <span className="client-detail-info-label">Familia</span>
            <span className="client-detail-info-value">
              {client.familyName || "—"}
            </span>
          </div>

          <div className="client-detail-info-item">
            <span className="client-detail-info-label">Teléfono</span>
            <span className="client-detail-info-value">
              {client.phone || "—"}
            </span>
          </div>

          <div className="client-detail-info-item">
            <span className="client-detail-info-label">Email</span>
            <span className="client-detail-info-value">
              {client.email || "—"}
            </span>
          </div>

          <div className="client-detail-info-item client-detail-info-item--full">
            <span className="client-detail-info-label">Notas</span>
            <span className="client-detail-info-value">
              {client.notes || "—"}
            </span>
          </div>
        </div>
      </section>

      <section className="client-detail-section">
        <ClientCurrentMaterials clientId={client.id} materials={materials} />
      </section>

      <section className="client-detail-section card">
        <div className="client-detail-actions-header">
          <h2 className="client-detail-section-title">Acciones</h2>
          <p className="client-detail-actions-text">
            Asigna nuevos materiales o registra una devolución
          </p>
        </div>

        <div className="client-actions">
          <button
            className={`client-action-button ${
              activeAction === "assign" ? "client-action-button--active" : ""
            }`}
            onClick={() => toggleAction("assign")}
          >
            Asignar materiales
          </button>

          <button
            className={`client-action-button ${
              activeAction === "return" ? "client-action-button--active" : ""
            }`}
            onClick={() => toggleAction("return")}
          >
            Devolver materiales
          </button>
        </div>

        {activeAction === "assign" && (
          <div className="client-detail-form-wrapper">
            <AssignMaterialsForm
              clientId={client.id}
              materials={materials}
              setMaterials={setMaterials}
              setAssignments={setAssignments}
            />
          </div>
        )}

        {activeAction === "return" && (
          <div className="client-detail-form-wrapper">
            <ReturnMaterialsForm
              clientId={client.id}
              materials={materials}
              setMaterials={setMaterials}
              assignments={assignments}
              setAssignments={setAssignments}
            />
          </div>
        )}
      </section>

      <section className="client-detail-section">
        <ClientHistory
          clientId={client.id}
          assignments={assignments}
          materials={materials}
        />
      </section>
    </div>
  );
}