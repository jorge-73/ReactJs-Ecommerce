import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../api/itemCollection.js";

export const DataBaseContext = createContext();

export const DataBaseProvider = ({ children }) => {
  const [productsDb, setProductsDb] = useState([]);

  useEffect(() => {
    const productsCollection = collection(dataBase, "items");

    const getProducts = async () => {
      const data = await getDocs(productsCollection);
      const prodData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductsDb(prodData[0].productos);
    };
    getProducts();
  }, []);

  return (
    <DataBaseContext.Provider value={{ productsDb }}>
      {children}
    </DataBaseContext.Provider>
  );
};
