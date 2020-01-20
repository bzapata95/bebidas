import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function Receta({ receta }) {
  // Alguna configuración de material UI
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const hanldeClose = () => {
    setOpen(false);
  };

  const { info, setIdReceta } = useContext(ModalContext);

  // Muesta y formatea los ingredientes
  const mostrarIngredientes = info => {
    let ingredientes = [];

    for (let i = 1; i < 16; i++) {
      if (info[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {info[`strIngredient${i}`]} {info[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          src={receta.strDrinkThumb}
          className="card-img-top"
          alt={receta.strDrink}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              hanldeClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{info.strDrink}</h2>
              <h3 className="mt-4">Intrucciones</h3>
              <p>{info.strInstructions}</p>
              <img
                className="img-fluid my-4"
                style={{ height: 350 }}
                src={info.strDrinkThumb}
              ></img>

              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(info)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
