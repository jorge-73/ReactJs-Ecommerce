import { Navbar } from "./components/NavBar/Navbar";
import { ItemListContainer } from "./components/Catalogue/ItemListContainer";
import { ItemDetailContainer } from "./components/ProductDetail/ItemDetailContainer";
import { CartContainer } from "./components/Cart/CartContainer";
import { CartProvider } from "./contexts/CartContext";
import { DataBaseProvider } from "./contexts/DataBaseProvider";
import { Route, Routes } from "react-router-dom";
import { Checkout } from "./components/Checkout/Checkout";

function App() {
  return (
    <DataBaseProvider>
      <CartProvider>
        <Navbar background={"transparent"} />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting={`Catálogo de Productos`} />}
          />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/category/:Category" element={<ItemListContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </DataBaseProvider>
  );
}

export default App;
