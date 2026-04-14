import { useMemo, useState } from "react";
import "./AssignMaterialsForm.css";
import { useAppDataContext } from "../../context/AppDataContext";

export default function AssignMaterialsForm({ clientId }) {
  const { materials = [], setMaterials, setAssignments } = useAppDataContext();

  const today = new Date().toISOString().split("T")[0];

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedDate, setAssignedDate] = useState(today);

  const safeMaterials = Array.isArray(materials)
    ? materials.filter((material) => material && typeof material === "object")
    : [];

  const availableMaterials = useMemo(() => {
    return safeMaterials.filter((material) => material.status === "available");
  }, [safeMaterials]);

  const filteredMaterials = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return availableMaterials;

    return availableMaterials.filter((material) => {
      const codeMatch = material.id.toLowerCase().includes(normalizedSearch);
      const nameMatch = material.name.toLowerCase().includes(normalizedSearch);

      return codeMatch || nameMatch;
    });
  }, [availableMaterials, searchTerm]);

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
              status: "assigned",
              currentClientId: clientId,
            }
          : material
      )
    );

    const newAssignment = {
      id: `a${Date.now()}`,
      clientId,
      materialIds: selectedMaterials,
      assignedAt: assignedDate,
      returnedAt: null,
      status: "active",
      notes: "",
    };

    setAssignments((prevAssignments) => [newAssignment, ...prevAssignments]);

    setSelectedMaterials([]);
    setSearchTerm("");
    setAssignedDate(today);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Asignar materiales</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="assigned-date">
          Fecha de asignación
        </label>
        <input
          id="assigned-date"
          type="date"
          className="form-input assign-materials-form-date"
          value={assignedDate}
          onChange={(event) => setAssignedDate(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="assign-search">
          Buscar material
        </label>
        <input
          id="assign-search"
          type="text"
          className="form-input"
          placeholder="Buscar por código o nombre"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {availableMaterials.length === 0 ? (
        <p className="form-empty">
          No hay materiales disponibles ahora mismo.
        </p>
      ) : filteredMaterials.length === 0 ? (
        <p className="form-empty">
          No se encontraron materiales con esa búsqueda.
        </p>
      ) : (
        <div className="form-list assign-materials-form-list">
          {filteredMaterials.map((material) => (
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
          Guardar asignación
        </button>
      </div>
    </form>
  );
}