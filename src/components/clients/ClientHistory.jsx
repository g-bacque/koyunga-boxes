import "./ClientHistory.css";

export default function ClientHistory({ clientId, assignments, materials }) {
  const clientAssignments = assignments
    .filter((assignment) => assignment.clientId === clientId)
    .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt));

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  const getMaterialName = (materialId) => {
    const material = materials.find((item) => item.id === materialId);
    return material ? material.name : materialId;
  };

  return (
    <div className="client-history">
      <h2 className="client-history-title">Historial</h2>

      {clientAssignments.length === 0 ? (
        <p className="client-history-empty">
          Este cliente todavía no tiene historial de materiales.
        </p>
      ) : (
        <div className="client-history-list">
          {clientAssignments.map((assignment) => (
            <div key={assignment.id} className="client-history-group">
              <p className="client-history-date">
                {formatDate(assignment.assignedAt)}
              </p>

              <div className="client-history-materials">
                {assignment.materialIds.map((materialId) => (
                  <p key={materialId} className="client-history-material-item">
                    <span className="client-history-material-code">
                      {materialId}
                    </span>
                    <span className="client-history-material-separator"> · </span>
                    <span className="client-history-material-name">
                      {getMaterialName(materialId)}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}