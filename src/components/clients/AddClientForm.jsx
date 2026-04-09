import { useState } from "react";
import "./AddClientForm.css";

export default function AddClientForm({ setClients, onClientAdded }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    const newClient = {
      id: `c${Date.now()}`,
      name: name.trim(),
      lastName: lastName.trim(),
      familyName: familyName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
    };

    setClients((prevClients) => [newClient, ...prevClients]);

    setName("");
    setLastName("");
    setFamilyName("");
    setPhone("");
    setEmail("");
    setNotes("");

    if (onClientAdded) {
      onClientAdded();
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">Añadir cliente</h2>

      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="client-name">
            Nombre
          </label>
          <input
            id="client-name"
            type="text"
            className="form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="client-last-name">
            Apellido
          </label>
          <input
            id="client-last-name"
            type="text"
            className="form-input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="client-family-name">
            Familia
          </label>
          <input
            id="client-family-name"
            type="text"
            className="form-input"
            value={familyName}
            onChange={(event) => setFamilyName(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="client-phone">
            Teléfono
          </label>
          <input
            id="client-phone"
            type="text"
            className="form-input"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="client-email">
            Email
          </label>
          <input
            id="client-email"
            type="email"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="client-notes">
            Notas
          </label>
          <textarea
            id="client-notes"
            className="form-textarea"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="form-button-primary">
          Guardar cliente
        </button>
      </div>
    </form>
  );
}