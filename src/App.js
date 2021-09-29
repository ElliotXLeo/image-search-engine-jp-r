import { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (busqueda === '') {
      return;
    } else {
      const consultarApi = async () => {
        const imagenesPorPagina = 30;
        const key = '18225503-c71d729ffed9912fd44abcc81';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

        const respuesta = await fetch(url);
        const data = await respuesta.json();
        setImagenes(data.hits);
      };
      consultarApi();
    }
  }, [busqueda])

  return (
    <Fragment>
      <div className="container">
        <div className="jumbotron">
          <h1 className="lead text-center">Buscador de Imágenes</h1>
          <Formulario
            setBusqueda={setBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <ListadoImagenes
            imagenes={imagenes}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
