import { useMemo, useState } from "react";
import MaterialTable from "../components/materials/MaterialTable";
import MaterialFilters from "../components/materials/MaterialFilters";
import AddMaterialForm from "../components/materials/AddMaterialForm";
import { useAppDataContext } from "../context/AppDataContext";
import "./InventoryPage.css";

export default function InventoryPage({ onDeleteMaterial }) {
  const { materials = [], setMaterials, clients = [] } = useAppDataContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddMaterialForm, setShowAddMaterialForm] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const handleToggleAddMaterialForm = () => {
    setShowAddMaterialForm((prev) => !prev);
  };

  const handleMaterialAdded = () => {
    setShowAddMaterialForm(false);
  };

  const safeMaterials = Array.isArray(materials)
  ? materials.filter((material) => material && typeof material === "object")
  : [];

  const categories = useMemo(() => {
    return [...new Set(safeMaterials.map((material) => material.category))].sort();
  }, [safeMaterials]);

  const filteredMaterials = useMemo(() => {
    return safeMaterials.filter((material) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        material.id.toLowerCase().includes(normalizedSearch) ||
        material.name.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || material.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || material.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [safeMaterials, searchTerm, statusFilter, categoryFilter]);

  return (
    <div className="inventory-page">
      <div className="inventory-page-header">
        <button
          className="inventory-page-action-button"
          onClick={handleToggleAddMaterialForm}
        >
          {showAddMaterialForm ? "Cerrar formulario" : "Añadir material"}
        </button>
      </div>

      {showAddMaterialForm && (
        <AddMaterialForm
          setMaterials={setMaterials}
          onMaterialAdded={handleMaterialAdded}
        />
      )}

      <div className="inventory-filters-header">
        <MaterialFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />

        <button
          className="inventory-clear-button"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </button>
      </div>

      <MaterialTable
        materials={filteredMaterials}
        clients={clients}
        onDeleteMaterial={onDeleteMaterial}
      />
    </div>
  );
}