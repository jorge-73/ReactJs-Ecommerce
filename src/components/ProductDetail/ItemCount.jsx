import { useState } from "react";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const ItemCount = ({ quantity, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  return (
    <>
      <div className="d-flex flex-column justify-content-center">
        <div>
          <button
            disabled={quantity === 0}
            className="btn btn-secondary"
            onClick={() => {
              if (count > 0) {
                setCount(count - 1);
              }
            }}
          >
            -
          </button>
          <span className="m-1 fw-bold fs-5">{count}</span>
          <button
            disabled={quantity === 0}
            className="btn btn-secondary"
            onClick={() => {
              if (count < quantity) {
                setCount(count + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <button
          disabled={count === 0}
          className="btn btn-success mx-auto my-2"
          onClick={() => {
            onAdd(count);
            Toastify({
              text: "Producto Agregado al Carrito",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                color: "#EEE",
                background:
                  "#008000" /* Created with https://www.css-gradient.com */,
              },
              onClick: function () {}, // Callback after click
            }).showToast();
          }}
        >
          Agregar al Carrito
        </button>
        <p>{`Stock Disponible: ${quantity - count}`}</p>
      </div>
    </>
  );
};
