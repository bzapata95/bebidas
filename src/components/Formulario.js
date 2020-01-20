import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

// import { Container } from './styles';

export default function Formulario() {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: ""
  });

  const { categorias } = useContext(CategoriasContext);
  const { guardarRecetas, setConsultar } = useContext(RecetasContext);

  const obtenerDatos = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      className="col-md-12"
      onSubmit={e => {
        e.preventDefault();
        guardarRecetas(busqueda);
        setConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Busca bebidas por categoría o ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Buscar por ingrediente"
            onChange={obtenerDatos}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatos}
          >
            <option value="">-- Selecciona categoría --</option>
            {categorias.map(categoria => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar bebidas"
          />
        </div>
      </div>
    </form>
  );
}
