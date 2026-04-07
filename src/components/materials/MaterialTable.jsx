import "./MaterialTable.css";
import MaterialStatusBadge from "./MaterialStatusBadge";

export default function MaterialTable({
  materials,
  clients,
  onDeleteMaterial,
}) {
  const getClientName = (clientId) => {
    if (!clientId) return "-";

    const client = clients.find((item) => item.id === clientId);
    return client ? `${client.name} ${client.lastName}`.trim() : "-";
  };

  const handleDeleteClick = (event, materialId) => {
    event.stopPropagation();
    onDeleteMaterial(materialId);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Nivel</th>
            <th>Estado</th>
            <th>Cliente actual</th>
            <th>Notas</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.name}</td>
              <td>{material.category || "-"}</td>
              <td>{material.level || "-"}</td>
              <td>
                <MaterialStatusBadge status={material.status} />
              </td>
              <td>{getClientName(material.currentClientId)}</td>
              <td>{material.notes || "-"}</td>
              <td>
                <button
                  className="material-table-delete-button"
                  onClick={(event) => handleDeleteClick(event, material.id)}
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