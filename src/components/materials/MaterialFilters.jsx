import "./MaterialFilters.css";

export default function MaterialFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="material-filters">
      <input
        type="text"
        className="material-filters-search"
        placeholder="Buscar por código o nombre"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        className="material-filters-select"
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">Todos los estados</option>
        <option value="available">Disponible</option>
        <option value="assigned">Asignado</option>
      </select>

      <select
        className="material-filters-select"
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}