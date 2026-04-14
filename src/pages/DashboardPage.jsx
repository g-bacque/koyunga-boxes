import "./DashboardPage.css";
import { useAppDataContext } from "../context/AppDataContext";

export default function DashboardPage() {
  const { materials = [] } = useAppDataContext();

  const safeMaterials = Array.isArray(materials)
    ? materials.filter((material) => material && typeof material === "object")
    : [];

  const totalMaterials = safeMaterials.length;

  const availableMaterials = safeMaterials.filter(
    (material) => material.status === "available"
  ).length;

  const assignedMaterials = safeMaterials.filter(
    (material) => material.status === "assigned"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-grid">
        <div className="dashboard-page-card">
          <p className="dashboard-page-card-label">Materiales totales</p>
          <p className="dashboard-page-card-value">{totalMaterials}</p>
        </div>

        <div className="dashboard-page-card">
          <p className="dashboard-page-card-label">Disponibles</p>
          <p className="dashboard-page-card-value">{availableMaterials}</p>
        </div>

        <div className="dashboard-page-card">
          <p className="dashboard-page-card-label">Asignados</p>
          <p className="dashboard-page-card-value">{assignedMaterials}</p>
        </div>
      </div>
    </div>
  );
}