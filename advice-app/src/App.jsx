import { useState } from "react";
import Home from "./componentes/Home";
import Favoritos from "./componentes/favoritos";
import Detalle from "./componentes/Detalle";
import Informativa from "./componentes/Informativa";
import Mapa from "./componentes/mapa";
import Menu from "./componentes/menu";

function App() {
  const [tab, setTab] = useState("home");
  const [seleccion, setSeleccion] = useState(null);
  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("favoritos")) || []
  );

  const cambiarTab = (nueva) => setTab(nueva);

  const agregarFavorito = (advice) => {
    const existe = favoritos.find((f) => f.id === advice.id);
    let nuevosFavs;
    if (existe) {
      nuevosFavs = favoritos.filter((f) => f.id !== advice.id);
    } else {
      nuevosFavs = [...favoritos, advice];
    }
    setFavoritos(nuevosFavs);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavs));
  };

  return (
    <div className="app">
      <h1 className="titulo">💬 Advice App</h1>

      {tab === "home" && (
        <Home onSelect={setSeleccion} onTab={setTab} onFav={agregarFavorito} />
      )}
      {tab === "detalle" && seleccion && (
        <Detalle advice={seleccion} onFav={agregarFavorito} onBack={setTab} />
      )}
      {tab === "favoritos" && (
        <Favoritos data={favoritos} onSelect={setSeleccion} onTab={setTab} />
      )}
      {tab === "informativa" && <Informativa />}
      {tab === "mapa" && <Mapa />}

      <Menu tab={tab} cambiarTab={cambiarTab} />
    </div>
  );
}

export default App;
