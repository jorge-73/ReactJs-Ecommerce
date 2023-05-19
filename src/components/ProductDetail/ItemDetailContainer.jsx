import { ItemDetail } from "./ItemDetail";

import { useParams } from "react-router-dom";

import { DataBaseContext } from "../../contexts/DataBaseProvider";
import { useContext } from "react";

export const ItemDetailContainer = () => {

  const {productsDb} = useContext(DataBaseContext);

  let { id } = useParams()
  
  const product = productsDb.find((prod) => prod.id === parseInt(id));

  return (
    <div className="container text-center">
      <h2>Detalle del Producto</h2>
      <div className="d-flex justify-content-center align-items-center">
        <ItemDetail item={product} />
      </div>
    </div>
  )
};