import { useState } from "react";

function Home({ onSelect, onTab, onFav }) {
  const [query, setQuery] = useState("life");
  const [advice, setAdvice] = useState(null);
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAdvice = async () => {
    setLoading(true);
    setError("");
    setAdvice(null);
    setTranslated("");

    try {
      // Buscar consejo
      const res = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
      const data = await res.json();

      if (!data.slips || data.slips.length === 0) {
        setError("No se encontraron consejos para esa palabra.");
        setLoading(false);
        return;
      }

      const slip = data.slips[0];
      setAdvice(slip);

      // Traducir al español
      const translateRes = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          slip.advice
        )}&langpair=en|es`
      );
      const translateData = await translateRes.json();
      setTranslated(translateData.responseData.translatedText);
    } catch (err) {
      console.error(err);
      setError("Error al obtener el consejo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home" style={{ textAlign: "center", padding: "1rem" }}>
      <h2>💡 Consejos de vida</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ejemplo: life, love, work..."
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          onClick={getAdvice}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#0f0f0fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {loading && <p>Cargando consejo...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {advice && (
        <div
          style={{
            background: "#000000ff",
            borderRadius: "10px",
            padding: "1rem",
            margin: "1rem auto",
            width: "80%",
            maxWidth: "400px",
          }}
        >
          <h3>🧠 En inglés:</h3>
          <p>{advice.advice}</p>

          <h3>🇪🇸 En español:</h3>
          <p>{translated}</p>

          <button
            onClick={() => onFav(advice)}
            style={{
              backgroundColor: "#ff4081",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            ❤️ Favorito
          </button>

          <button
            onClick={() => {
              onSelect(advice);
              onTab("detalle");
            }}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            🔍 Ver Detalle
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
