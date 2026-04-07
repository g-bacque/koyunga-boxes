import { useMemo, useState } from "react";
import "./AssignMaterialsForm.css";

export default function AssignMaterialsForm({
  clientId,
  materials,
  setMaterials,
  setAssignments,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedDate, setAssignedDate] = useState(today);

  const availableMaterials = useMemo(() => {
    return materials.filter((material) => material.status === "available");
  }, [materials]);

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
    <form className="assign-materials-form" onSubmit={handleSubmit}>
      <h2 className="assign-materials-form-title">Asignar materiales</h2>

      <div className="assign-materials-form-field">
        <label
          className="assign-materials-form-label"
          htmlFor="assigned-date"
        >
          Fecha de asignación
        </label>
        <input
          id="assigned-date"
          type="date"
          className="assign-materials-form-date"
          value={assignedDate}
          onChange={(event) => setAssignedDate(event.target.value)}
        />
      </div>

      <input
        type="text"
        className="assign-materials-form-search"
        placeholder="Buscar por código o nombre"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {availableMaterials.length === 0 ? (
        <p className="assign-materials-form-empty">
          No hay materiales disponibles ahora mismo.
        </p>
      ) : filteredMaterials.length === 0 ? (
        <p className="assign-materials-form-empty">
          No se encontraron materiales con esa búsqueda.
        </p>
      ) : (
        <div className="assign-materials-form-list">
          {filteredMaterials.map((material) => (
            <label key={material.id} className="assign-materials-form-item">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.id)}
                onChange={() => handleToggleMaterial(material.id)}
              />

              <div className="assign-materials-form-item-content">
                <span className="assign-materials-form-item-code">
                  {material.id}
                </span>
                <span className="assign-materials-form-item-name">
                  {material.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="assign-materials-form-button"
        disabled={selectedMaterials.length === 0}
      >
        Guardar asignación
      </button>
    </form>
  );
}