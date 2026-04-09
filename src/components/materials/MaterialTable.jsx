import "./MaterialTable.css";
import MaterialStatusBadge from "./MaterialStatusBadge";
import { getCategoryBackground } from "../../utils/categoryHelpers";

export default function MaterialTable({
  materials,
  clients,
  onDeleteMaterial,
}) {
  const getClientName = (clientId) => {
    if (!clientId) return "—";

    const client = clients.find((item) => item.id === clientId);
    return client ? `${client.name} ${client.lastName}`.trim() : "—";
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
          {materials.map((material, index) => {
            const previousCategory =
              index > 0 ? materials[index - 1]?.category : null;
            const isNewCategory = material.category !== previousCategory;
            const categoryBackground = getCategoryBackground(material.category);

            return (
              <FragmentRow
                key={material.id}
                isNewCategory={isNewCategory}
                category={material.category}
                categoryBackground={categoryBackground}
                material={material}
                getClientName={getClientName}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FragmentRow({
  isNewCategory,
  category,
  categoryBackground,
  material,
  getClientName,
  handleDeleteClick,
}) {
  return (
    <>
      {isNewCategory && (
        <tr className="material-category-row">
          <td
            colSpan={8}
            className="material-category-cell"
            style={{ backgroundColor: categoryBackground }}
          >
            {category || "Sin categoría"}
          </td>
        </tr>
      )}

      <tr
        className="material-row"
        style={{ backgroundColor: categoryBackground }}
      >
        <td>{material.id}</td>
        <td>{material.name}</td>
        <td>{material.category || "—"}</td>
        <td>{material.level || "—"}</td>
        <td>
          <MaterialStatusBadge status={material.status} />
        </td>
        <td>{getClientName(material.currentClientId)}</td>
        <td>{material.notes || "—"}</td>
        <td>
          <button
            className="material-table-delete-button"
            onClick={(event) => handleDeleteClick(event, material.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    </>
  );
}