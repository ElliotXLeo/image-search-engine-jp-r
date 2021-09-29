import { useState } from "react";
import Error from "./Error";

const Formulario = ({setBusqueda}) => {

  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(false);

  const buscarImagenes = (e) => {
    e.preventDefault();
    if (descripcion.trim() !== '') {
      setBusqueda(descripcion);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <form
      onSubmit={buscarImagenes}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Ingrese la descripción de la imagen"
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="form-group col-md-4">
          <button
            type="submit"
            className="btn btn-lg btn-danger btn-block"
          >Buscar</button>
        </div>
      </div>
      {error ? <Error mensaje="Se debe completar el formulario" /> : null}
    </form>
  );
};

export default Formulario;