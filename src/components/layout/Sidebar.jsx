export default function Sidebar({ setPage }) {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Koyunga</h1>

      <nav className="space-y-3">
        <button
          onClick={() => setPage("dashboard")}
          className="block w-full text-left hover:text-gray-300"
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("inventory")}
          className="block w-full text-left hover:text-gray-300"
        >
          Inventario
        </button>

        <button
          onClick={() => setPage("clients")}
          className="block w-full text-left hover:text-gray-300"
        >
          Clientes
        </button>
      </nav>
    </div>
  );
}