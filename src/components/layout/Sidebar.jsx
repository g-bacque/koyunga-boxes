import logo from "../../assets/koyunga-boxes-logo.png";
import "./Sidebar.css";

export default function Sidebar({ page, setPage }) {
  return (
    <header className="topbar">
      <div className="topbar-logo-container">
        <img src={logo} alt="Koyunga Boxes" className="topbar-logo" />
      </div>

      <nav className="topbar-menu">
        <button
          className={`topbar-link ${
            page === "dashboard" ? "topbar-link--active" : ""
          }`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`topbar-link ${
            page === "inventory" ? "topbar-link--active" : ""
          }`}
          onClick={() => setPage("inventory")}
        >
          Inventario
        </button>

        <button
          className={`topbar-link ${
            page === "clients" || page === "client-detail"
              ? "topbar-link--active"
              : ""
          }`}
          onClick={() => setPage("clients")}
        >
          Clientes
        </button>
      </nav>
    </header>
  );
}