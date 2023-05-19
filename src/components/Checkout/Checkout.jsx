import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { dataBase } from "../../api/itemCollection.js";
import "../../styles/Checkout.css";

import { CartContext } from "../../contexts/CartContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const Checkout = () => {
  let { state } = useLocation();
  const productCartList = state.productCartList;
  const finPrice = state.finPrice;

  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [match, setMatch] = useState(true);

  const [ordersDb, setOrdersDb] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });
  const [orders, setOrders] = useState({});

  const { setMostrarNavbar } = useContext(CartContext);

  const [actualizar, setActualizar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmail1Change = (event) => {
    setEmail1(event.target.value);
    setMatch(true);
  };
  const handleEmail2Change = (event) => {
    setEmail2(event.target.value);
    setMatch(true);
  };

  const addOrders = () => {
    addDoc(collection(dataBase, "orders"), orders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email1 === email2) {
      toast.success("Datos añadidos correctamente!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOrders({ formulario, productCartList, finPrice });
    } else {
      setMatch(false);
      toast.error("emails incorrectos!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const endShop = async (id) => {
    const ordersDoc = doc(dataBase, "orders", id);
    await deleteDoc(ordersDoc);
  };

  const funActualizar = () => {
    setActualizar(true)
  }

  useEffect(() => {
    setMostrarNavbar(false);

    const orderCollection = collection(dataBase, "orders");

    const getOrders = async () => {
      const order = await getDocs(orderCollection);
      const orderData = order.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrdersDb(orderData);
    };
    getOrders();
    console.log(actualizar);
  }, [actualizar]);

  return (
    <>
      <div
        className={`container containerForm ${
          ordersDb.length > 0 ? "d-none" : ""
        }`}
      >
        <div className="table-responsive mt-5">
          <table className="table table-bordered text-center rounded-3">
            <thead className="fw-bold fs-5">
              <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody className="fs-6">
              {productCartList.map((item) => (
                <tr key={item.id}>
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <span className="bg-warning d-inline-block rounded-3 p-2 fw-bold">
              Total Compra: ${finPrice}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formulario.apellido}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese su apellido"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="telefono" className="form-label">
              Telefono
            </label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              value={formulario.telefono}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese su Numero Telefónico"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              style={match ? {} : { borderColor: "red" }}
              type="email"
              id="email"
              name="email"
              value={formulario.email}
              onChange={(e) => {
                handleChange(e);
                handleEmail1Change(e);
              }}
              className="form-control"
              placeholder="Ingrese su Email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email2" className="form-label">
              Repetir Email
            </label>
            <input
              style={match ? {} : { borderColor: "red" }}
              type="email"
              id="email2"
              name="email2"
              value={email2}
              onChange={handleEmail2Change}
              className="form-control"
              placeholder="Repita su Email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
        <button
          disabled={orders.formulario === undefined}
          className="btn btn-success d-block mx-auto p-3"
          onClick={() => {
            addOrders();
            MySwal.fire({
              position: "top",
              icon: "success",
              title: "Muchas Gracias por su Compra.!",
              showConfirmButton: false,
              timer: 2000,
            });
            funActualizar();
          }}
        >
          Finalizar Compra
        </button>
      </div>
      <div
        className={`container containerCheckout my-5 rounded-2 ${
          ordersDb.length > 0 ? "" : "d-none"
        }`}
      >
        {ordersDb.length > 0 ? (
          <>
            <h1 className="text-center">DETALLE DE LA COMPRA</h1>
            <hr />
            <h4 className="text-center">DATOS DEL USUARIO</h4>
            <div className="container-User">
              <p>
                <strong>Nombre Completo: </strong>
                {ordersDb[0].formulario.nombre}{" "}
                {ordersDb[0].formulario.apellido}
              </p>
              <p>
                <strong>Email : </strong>
                {ordersDb[0].formulario.email}
              </p>
              <p>
                <strong>Telefono : </strong>
                {ordersDb[0].formulario.telefono}
              </p>
              <p>
                <strong>ID de la compra : </strong>
                {ordersDb[0].id}
              </p>
            </div>
            <hr />
            <h4 className="text-center">DATOS DE LOS PRODUCTOS</h4>
            {ordersDb[0].productCartList.map((product) => (
              <div key={product.id} className="container-Products">
                <img
                  src={product.pictureUrl}
                  alt={product.title}
                  className="imgOrders"
                />
                <p>
                  <strong>Producto: </strong>
                  {product.title}
                </p>
                <p>
                  <strong>Descripción: </strong>
                  {product.description}
                </p>
                <p>
                  <strong>Cantidad: </strong>
                  {product.quantity}
                </p>
                <p>
                  <strong>Precio Unitario: </strong>${product.price}
                </p>
                <p>
                  <strong>Precio Total: </strong>${product.totalPrice}
                </p>
              </div>
            ))}
            <hr />
            <h4 className="text-center">
              PRECIO TOTAL DE LA COMPRA: ${ordersDb[0].finPrice}
            </h4>
            <Link
              to={"/"}
              onClick={() => {
                endShop(ordersDb[0].id);
                setMostrarNavbar(true);
              }}
              className="btn btn-secondary mx-auto"
            >
              Volver al Inicio
            </Link>
          </>
        ) : (
          <h1 className="text-center">Aun no hay Compras Realizadas</h1>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};