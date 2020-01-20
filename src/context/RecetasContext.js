import React from "react";
import axios from "axios";

export const RecetasContext = React.createContext();

const RecetasProvider = props => {
  const [recetas, setRecetas] = React.useState([]);
  const [busqueda, guardarRecetas] = React.useState({
    nombre: "",
    categoria: ""
  });
  const [consultar, setConsultar] = React.useState(false);

  React.useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const { nombre, categoria } = busqueda;
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;

        const resultado = await axios.get(url);

        const { drinks } = resultado.data;

        setRecetas(drinks);
      };
      obtenerRecetas();
    }
  }, [busqueda]);

  return (
    <RecetasContext.Provider value={{ guardarRecetas, setConsultar, recetas }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
