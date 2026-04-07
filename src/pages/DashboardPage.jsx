import "./DashboardPage.css";

export default function DashboardPage({ materials }) {
  const totalMaterials = materials.length;
  const availableMaterials = materials.filter(
    (material) => material.status === "available"
  ).length;
  const assignedMaterials = materials.filter(
    (material) => material.status === "assigned"
  ).length;

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page-title">Dashboard</h1>

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