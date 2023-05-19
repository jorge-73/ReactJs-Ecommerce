import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";

import { DataBaseContext } from "../../contexts/DataBaseProvider";
import { useContext } from "react";

import { useState, useEffect } from "react";

export function ItemListContainer({ greeting }) {

  const { productsDb } = useContext(DataBaseContext);

  const [prod, setProd] = useState([]);
  const [productWait, setProductWait] = useState(false);

  const { Category } = useParams();

  useEffect(() => {

    const promesa = new Promise((res, reject) => {
     // setTimeout(() => {
        res(productsDb);
      // }, 2000);
    });

    setProd([]);

    promesa.then(result => {
      if (!Category) {
        setProd(result);
        setProductWait(true);
      } else {
        const categoryProd = productsDb.filter(
          (prod) => prod.category === Category
        );
        setProd(categoryProd);
        setProductWait(true);
      }
    });
  }, [Category, productsDb]);

  return productWait ? (
    <div className="container text-center mt-3">
      <h2 className="text-info fw-bold">{greeting}</h2>
      <div className="itemList mt-4">
        <h2 className="text-capitalize text-info fw-bold">{Category}</h2>
        <ItemList items={prod} />
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status">
      </div>
    </div>
  );
}