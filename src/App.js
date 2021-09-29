import { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === '') {
      return;
    } else {
      const consultarApi = async () => {
        const imagenesPorPagina = 30;
        const key = '18225503-c71d729ffed9912fd44abcc81';
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const respuesta = await fetch(url);
        const data = await respuesta.json();

        const calculoTotalPaginas = Math.ceil(data.totalHits / imagenesPorPagina);

        setImagenes(data.hits);
        setTotalPaginas(calculoTotalPaginas);

        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({ behavior: 'smooth' });
      };
      consultarApi();
    }
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      const nuevaPaginaActual = paginaActual - 1;
      setPaginaActual(nuevaPaginaActual);
    }
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      const nuevaPaginaActual = paginaActual + 1;
      setPaginaActual(nuevaPaginaActual);
    }
  };

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

          {
            (paginaActual === 1) ?
              (
                null
              )
              :
              (
                <button
                  type="button"
                  className="btn-info mr-1"
                  onClick={paginaAnterior}
                >&laquo; Anterior</button>
              )
          }

          {
            (paginaActual === totalPaginas) ?
              (
                null
              )
              :
              (
                <button
                  type="button"
                  className="btn-info mr-1"
                  onClick={paginaSiguiente}
                >Siguiente &raquo;</button>
              )
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
