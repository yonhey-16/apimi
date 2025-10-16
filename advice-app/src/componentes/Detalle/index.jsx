export default function Detalle({ advice, onFav, onBack }) {
  const compartir = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Consejo",
        text: advice.advice,
      });
    } else {
      alert("Compartir no soportado en este navegador.");
    }
  };

  return (
    <div className="detalle">
      <h2>Detalle del Consejo</h2>
      <p>💡 {advice.advice}</p>
      <button onClick={() => onFav(advice)}>❤️ Favorito</button>
      <button onClick={compartir}>📤 Compartir</button>
      <button onClick={() => onBack("home")}>⬅️ Volver</button>
    </div>
  );
}
