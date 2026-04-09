import { useState } from "react";
import "./ReturnMaterialsForm.css";

export default function ReturnMaterialsForm({
  clientId,
  materials,
  setMaterials,
  assignments,
  setAssignments,
}) {
  const assignedMaterials = materials.filter(
    (material) => material.currentClientId === clientId
  );

  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleToggleMaterial = (materialId) => {
    setSelectedMaterials((prevSelected) =>
      prevSelected.includes(materialId)
        ? prevSelected.filter((id) => id !== materialId)
        : [...prevSelected, materialId]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedMaterials.length === 0) return;

    setMaterials((prevMaterials) =>
      prevMaterials.map((material) =>
        selectedMaterials.includes(material.id)
          ? {
              ...material,
              status: "available",
              currentClientId: null,
            }
          : material
      )
    );

    const today = new Date().toISOString().split("T")[0];

    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        const isSameClient = assignment.clientId === clientId;
        const isActive = assignment.status === "active";
        const containsReturnedMaterials = assignment.materialIds.some((id) =>
          selectedMaterials.includes(id)
        );

        if (isSameClient && isActive && containsReturnedMaterials) {
          return {
            ...assignment,
            returnedAt: today,
            status: "closed",
          };
        }

        return assignment;
      })
    );

    setSelectedMaterials([]);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Devolver materiales</h2>

      {assignedMaterials.length === 0 ? (
        <p className="form-empty">
          Este cliente no tiene materiales asignados para devolver.
        </p>
      ) : (
        <div className="form-list">
          {assignedMaterials.map((material) => (
            <label key={material.id} className="form-check-item">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.id)}
                onChange={() => handleToggleMaterial(material.id)}
              />

              <div className="form-check-item-content">
                <span className="form-check-item-code">{material.id}</span>
                <span className="form-check-item-name">{material.name}</span>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="form-button-primary"
          disabled={selectedMaterials.length === 0}
        >
          Guardar devolución
        </button>
      </div>
    </form>
  );
}