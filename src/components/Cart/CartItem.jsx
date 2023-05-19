import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const CartItem = ({ item }) => {
  const { removeProduct } = useContext(CartContext);

  return (
    <>
      <tr>
        <td>
          <img
            className="img-thumbnail"
            style={{ width: "50px" }}
            src={item.pictureUrl}
            alt={item.title}
          />
        </td>
        <td>
          <p>{item.title}</p>
        </td>
        <td>
          <p>$ {item.price}</p>
        </td>
        <td>
          <p>{item.quantity}</p>
        </td>
        <td>
          <p>$ {item.totalPrice}</p>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              /* console.log(item.id); */
              removeProduct(item.id);
              Toastify({
                text: "Producto Eliminado.!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background:
                    "#ff0000" /* Created with https://www.css-gradient.com */,
                },
                onClick: function () {}, // Callback after click
              }).showToast();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    </>
  );
};
