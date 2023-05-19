import "../../styles/CartContainer.css";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { CartItem } from "./CartItem";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import { Link } from "react-router-dom";

export const CartContainer = () => {
  const { productCartList, clearProductCartList } = useContext(CartContext);
  const [finPrice, setFinPrice] = useState(0);

  useEffect(() => {
    const finalPriceTotal = () => {
      if (productCartList.length > 0) {
        const finalPrice = productCartList.map((prod) => prod.totalPrice);
        setFinPrice(finalPrice.reduce((acc, price) => acc + price));
      }
    };
    finalPriceTotal();
  }, [productCartList]);

  return (
    <div className="container">
      {productCartList.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-bordered text-center rounded-3">
              <thead className="fw-bold fs-5">
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Precio Total</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody className="fs-6">
                {productCartList.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-start">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary mx-3"
                onClick={() => {
                  MySwal.fire({
                    title: "Estas Seguro?",
                    text: "No podras revertir esta acción!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, borrar todo!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      clearProductCartList();
                      Swal.fire(
                        "Borrado!",
                        "Todos los productos del carrito han sido Eliminados.",
                        "success"
                      );
                    }
                  });
                }}
              >
                Vaciar el carrito
              </button>

              <Link
                to={"/checkout"}
                state={{ productCartList, finPrice }}
                className="btn btn-success"
                onClick={() => {
                  clearProductCartList();
                }}
              >
                Continuar Compra
              </Link>
              <div className="mx-3 bg-warning d-flex align-items-center rounded-3 p-2">
                <h6>Total Compra: ${finPrice}</h6>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-center">Carrito Vacio.!</h2>
      )}
    </div>
  );
};
