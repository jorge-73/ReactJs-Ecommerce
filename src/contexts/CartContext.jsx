import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productCartList, setProductCartList] = useState([]);

  const [mostrarNavbar, setMostrarNavbar] = useState(true);

  const isInCart = (id) => {
    const elementExists = productCartList.some(
      (elemento) => elemento.id === id
    );
    return elementExists;
  };

  const addProduct = (product, qty) => {
    const newList = [...productCartList];

    if (isInCart(product.id)) {
      const productIndex = productCartList.findIndex(
        (element) => element.id === product.id
      );
      newList[productIndex].quantity = newList[productIndex].quantity + qty;
      newList[productIndex].totalPrice =
        newList[productIndex].quantity * newList[productIndex].price;
      setProductCartList(newList);
    } else {
      const newProduct = {
        ...product,
        quantity: qty,
        totalPrice: qty * product.price,
      };

      const newList = [...productCartList];
      newList.push(newProduct);
      setProductCartList(newList);
    }
  };

  const removeProduct = (idProduct) => {

    const copyArray = [...productCartList];
    const newArray = copyArray.filter((elm) => elm.id !== idProduct);
    setProductCartList(newArray);
  };

  const clearProductCartList = () => {
    setProductCartList([]);
  };

  const getTotalProducts = () => {

    const totalProducts = productCartList.reduce(
      (acc, item) => acc + item.quantity,0);
    return totalProducts;
  };

  const useLocalStorage = (key, iniValue) => {
    const [itemStorage, setItemStorage] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : iniValue;
      } catch (error) {
        return iniValue;
      }
    });

    const setItems = (value) => {
      try {
        setItemStorage(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };

    return [itemStorage, setItems];
  };

  return (
    <CartContext.Provider
      value={{
        productCartList,
        addProduct,
        removeProduct,
        clearProductCartList,
        isInCart,
        getTotalProducts,
        useLocalStorage,
        mostrarNavbar,
        setMostrarNavbar
      }}
    >
      {children}
    </CartContext.Provider>
  );
};