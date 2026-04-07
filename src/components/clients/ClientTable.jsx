import "./ClientTable.css";

export default function ClientTable({
  clients,
  onSelectClient,
  onDeleteClient,
}) {
  const handleDeleteClick = (event, clientId) => {
    event.stopPropagation();
    onDeleteClient(clientId);
  };

  return (
    <div className="client-table-container">
      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Familia</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="client-table-row"
              onClick={() => onSelectClient(client)}
            >
              <td>{client.id}</td>
              <td>
                {client.name} {client.lastName}
              </td>
              <td>{client.familyName || "-"}</td>
              <td>{client.phone || "-"}</td>
              <td>{client.email || "-"}</td>
              <td>{client.notes || "-"}</td>
              <td>
                <button
                  className="client-table-delete-button"
                  onClick={(event) => handleDeleteClick(event, client.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}