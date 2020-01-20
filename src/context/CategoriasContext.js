import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creando el context
export const CategoriasContext = createContext();

// Provider es donde se encuentras las funciones y state
const CategoriasProvider = props => {
  // crear el state del context
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categorias = await axios.get(url);

      const { drinks } = categorias.data;
      setCategorias(drinks);
    };
    obtenerCategorias();
  }, []);

  //Los datos que van a estar en el componente o datos utilizados
  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
