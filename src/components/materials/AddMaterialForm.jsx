import { useState } from "react";
import "./AddMaterialForm.css";

export default function AddMaterialForm({ setMaterials, onMaterialAdded }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id.trim() || !name.trim()) return;

    const newMaterial = {
      id: id.trim(),
      name: name.trim(),
      category: category.trim(),
      level: level.trim(),
      status: "available",
      currentClientId: null,
      notes: notes.trim(),
    };

    setMaterials((prevMaterials) => [newMaterial, ...prevMaterials]);

    setId("");
    setName("");
    setCategory("");
    setLevel("");
    setNotes("");

    if (onMaterialAdded) {
      onMaterialAdded();
    }
  };

  return (
    <form className="add-material-form" onSubmit={handleSubmit}>
      <h2 className="add-material-form-title">Añadir material</h2>

      <div className="add-material-form-grid">
        <div className="add-material-form-field">
          <label className="add-material-form-label" htmlFor="material-id">
            Código
          </label>
          <input
            id="material-id"
            type="text"
            className="add-material-form-input"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </div>

        <div className="add-material-form-field">
          <label className="add-material-form-label" htmlFor="material-name">
            Nombre
          </label>
          <input
            id="material-name"
            type="text"
            className="add-material-form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="add-material-form-field">
          <label className="add-material-form-label" htmlFor="material-category">
            Categoría
          </label>
          <input
            id="material-category"
            type="text"
            className="add-material-form-input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        <div className="add-material-form-field">
          <label className="add-material-form-label" htmlFor="material-level">
            Nivel
          </label>
          <input
            id="material-level"
            type="text"
            className="add-material-form-input"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          />
        </div>

        <div className="add-material-form-field add-material-form-field--full">
          <label className="add-material-form-label" htmlFor="material-notes">
            Notas
          </label>
          <textarea
            id="material-notes"
            className="add-material-form-textarea"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="add-material-form-button">
        Guardar material
      </button>
    </form>
  );
}