import { useEffect, useState } from "react";
import "./EditMaterialForm.css";

export default function EditMaterialForm({
  material,
  onCancel,
  onSave,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    level: "",
    status: "available",
    notes: "",
  });

  useEffect(() => {
    if (!material) return;

    setFormData({
      id: material.id || "",
      name: material.name || "",
      category: material.category || "",
      level: material.level || "",
      status: material.status || "available",
      notes: material.notes || "",
    });
  }, [material]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.id.trim() || !formData.name.trim()) return;

    onSave({
      ...material,
      id: formData.id.trim(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      level: formData.level.trim(),
      status: formData.status,
      notes: formData.notes.trim(),
    });
  };

  if (!material) return null;

  return (
    <div className="edit-material-overlay" onClick={onCancel}>
      <div
        className="edit-material-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-material-header">
          <h2 className="edit-material-title">Editar material</h2>
          <p className="edit-material-subtitle">
            Modifica los datos del material seleccionado.
          </p>
        </div>

        <form className="edit-material-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="edit-material-id">
                Código
              </label>
              <input
                id="edit-material-id"
                type="text"
                className="form-input"
                value={formData.id}
                onChange={(event) => handleChange("id", event.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="edit-material-name">
                Nombre
              </label>
              <input
                id="edit-material-name"
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="edit-material-category">
                Categoría
              </label>
              <input
                id="edit-material-category"
                type="text"
                className="form-input"
                value={formData.category}
                onChange={(event) => handleChange("category", event.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="edit-material-level">
                Nivel
              </label>
              <input
                id="edit-material-level"
                type="text"
                className="form-input"
                value={formData.level}
                onChange={(event) => handleChange("level", event.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="edit-material-status">
                Estado
              </label>
              <select
                id="edit-material-status"
                className="form-select"
                value={formData.status}
                onChange={(event) => handleChange("status", event.target.value)}
              >
                <option value="available">Disponible</option>
                <option value="assigned">Asignado</option>
              </select>
            </div>

            <div className="form-field form-field--full">
              <label className="form-label" htmlFor="edit-material-notes">
                Notas
              </label>
              <textarea
                id="edit-material-notes"
                className="form-textarea"
                value={formData.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
              />
            </div>
          </div>

          <div className="edit-material-actions">
            <button
              type="button"
              className="edit-material-cancel"
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="edit-material-save">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}