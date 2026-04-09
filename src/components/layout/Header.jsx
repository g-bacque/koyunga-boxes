import "./Header.css";

const pageTitles = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Resumen general de Koyunga Boxes",
  },
  inventory: {
    title: "Inventario",
    subtitle: "Consulta y gestiona los materiales disponibles",
  },
  clients: {
    title: "Clientes",
    subtitle: "Consulta y gestiona los clientes del centro",
  },
  "client-detail": {
    title: "Ficha del cliente",
    subtitle: "Consulta materiales actuales e historial",
  },
};

export default function Header({ page }) {
  const currentPage = pageTitles[page] || pageTitles.dashboard;

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">{currentPage.title}</h1>
          <p className="header-subtitle">{currentPage.subtitle}</p>
        </div>
      </div>
    </header>
  );
}