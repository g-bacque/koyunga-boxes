import "./MaterialStatusBadge.css";

export default function MaterialStatusBadge({ status }) {
  const label = status === "available" ? "Disponible" : "Asignado";
  const statusClass =
    status === "available"
      ? "material-status-badge material-status-badge--available"
      : "material-status-badge material-status-badge--assigned";

  return <span className={statusClass}>{label}</span>;
}