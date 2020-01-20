import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { Container } from './styles';

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  const [idReceta, setIdReceta] = useState(null);
  const [receta, setReceta] = useState({});

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idReceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios.get(url);
      setReceta(resultado.data.drinks[0]);
    };
    obtenerReceta();

    return () => {
      setReceta({});
    };
  }, [idReceta]);

  return (
    <ModalContext.Provider value={{ info: receta, setIdReceta }}>
      {children}
    </ModalContext.Provider>
  );
}
