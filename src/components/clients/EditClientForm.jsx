import { useEffect, useState } from "react";
import "./EditClientForm.css";

export default function EditClientForm({
  client,
  onCancel,
  onSave,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    familyName: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (!client) return;

    setFormData({
      id: client.id || "",
      name: client.name || "",
      lastName: client.lastName || "",
      familyName: client.familyName || "",
      phone: client.phone || "",
      email: client.email || "",
      notes: client.notes || "",
    });
  }, [client]);

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
      ...client,
      id: formData.id.trim(),
      name: formData.name.trim(),
      lastName: formData.lastName.trim(),
      familyName: formData.familyName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      notes: formData.notes.trim(),
    });
  };

  if (!client) return null;

  return (
    <div className="edit-client-overlay" onClick={onCancel}>
      <div
        className="edit-client-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-client-header">
          <h2 className="edit-client-title">Editar cliente</h2>
          <p className="edit-client-subtitle">
            Modifica los datos del cliente.
          </p>
        </div>

        <form className="edit-client-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">ID</label>
              <input
                type="text"
                className="form-input"
                value={formData.id}
                onChange={(e) => handleChange("id", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Familia</label>
              <input
                type="text"
                className="form-input"
                value={formData.familyName}
                onChange={(e) => handleChange("familyName", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="form-field form-field--full">
              <label className="form-label">Notas</label>
              <textarea
                className="form-textarea"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              />
            </div>
          </div>

          <div className="edit-client-actions">
            <button
              type="button"
              className="edit-client-cancel"
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="edit-client-save">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}