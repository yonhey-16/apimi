export default function Favoritos({ data, onSelect, onTab }) {
  return (
    <div className="favoritos">
      <h2>❤️ Mis Favoritos</h2>
      {data.length === 0 && <p>No tienes consejos guardados.</p>}
      <ul>
        {data.map((a) => (
          <li key={a.id} className="card">
            <p>{a.advice}</p>
            <button onClick={() => { onSelect(a); onTab("detalle"); }}>
              Ver detalle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
