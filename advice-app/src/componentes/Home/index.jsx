import { useState } from "react";

export default function Home({ onSelect, onTab, onFav }) {
  const [query, setQuery] = useState("life");
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
      const data = await res.json();
      setAdvices(data.slips || []);
    } catch {
      alert("Error al obtener consejos");
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <h2>Buscar Consejos</h2>
      <div className="buscador">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Escribe una palabra..."
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && advices.length === 0 && <p>No hay resultados.</p>}

      <ul>
        {advices.map((a) => (
          <li key={a.id} className="card">
            <p>{a.advice}</p>
            <div>
              <button onClick={() => { onSelect(a); onTab("detalle"); }}>Ver</button>
              <button onClick={() => onFav(a)}>❤️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
