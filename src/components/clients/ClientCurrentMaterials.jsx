import "./ClientCurrentMaterials.css";

export default function ClientCurrentMaterials({ clientId, materials }) {
  const currentMaterials = materials.filter(
    (material) => material.currentClientId === clientId
  );

  return (
    <div className="client-current-materials">
      <h2 className="client-current-materials-title">Materiales actuales</h2>

      {currentMaterials.length === 0 ? (
        <p className="client-current-materials-empty">
          Este cliente no tiene materiales asignados ahora mismo.
        </p>
      ) : (
        <div className="client-current-materials-card">
          <div className="client-current-materials-list">
            {currentMaterials.map((material) => (
              <p
                key={material.id}
                className="client-current-materials-item"
              >
                <span className="client-current-materials-code">
                  {material.id}
                </span>
                <span className="client-current-materials-separator"> · </span>
                <span className="client-current-materials-name">
                  {material.name}
                </span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}