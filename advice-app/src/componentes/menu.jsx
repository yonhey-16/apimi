export default function Menu({ tab, cambiarTab }) {
  return (
    <nav className="menu">
      <button onClick={() => cambiarTab("home")}>🏠</button>
      <button onClick={() => cambiarTab("favoritos")}>❤️</button>
      <button onClick={() => cambiarTab("detalle")}>💬</button>
      <button onClick={() => cambiarTab("informativa")}>ℹ️</button>
      <button onClick={() => cambiarTab("mapa")}>🗺️</button>
    </nav>
  );
}
