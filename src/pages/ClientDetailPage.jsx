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
  const [activeAction, setActiveAction] = useState(null); // "assign" | "return" | null

  if (!client) return null;

  const toggleAction = (action) => {
    setActiveAction((prev) => (prev === action ? null : action));
  };

  return (
    <div className="client-detail-page">
      <button className="client-detail-back-button" onClick={onBack}>
        ← Volver
      </button>

      <h1 className="client-detail-page-title">
        {client.name} {client.lastName}
      </h1>

      <div className="client-detail-card">
        <p><strong>ID:</strong> {client.id}</p>
        <p><strong>Familia:</strong> {client.familyName || "-"}</p>
        <p><strong>Teléfono:</strong> {client.phone || "-"}</p>
        <p><strong>Email:</strong> {client.email || "-"}</p>
        <p><strong>Notas:</strong> {client.notes || "-"}</p>
      </div>

      <ClientCurrentMaterials clientId={client.id} materials={materials} />

      {/* Acciones */}
      <div className="client-actions">
        <button
          className="client-action-button"
          onClick={() => toggleAction("assign")}
        >
          Asignar materiales
        </button>

        <button
          className="client-action-button"
          onClick={() => toggleAction("return")}
        >
          Devolver materiales
        </button>
      </div>

      {/* Formularios condicionales */}
      {activeAction === "assign" && (
        <AssignMaterialsForm
          clientId={client.id}
          materials={materials}
          setMaterials={setMaterials}
          setAssignments={setAssignments}
        />
      )}

      {activeAction === "return" && (
        <ReturnMaterialsForm
          clientId={client.id}
          materials={materials}
          setMaterials={setMaterials}
          assignments={assignments}
          setAssignments={setAssignments}
        />
      )}

      <ClientHistory
        clientId={client.id}
        assignments={assignments}
        materials={materials}
      />
    </div>
  );
}