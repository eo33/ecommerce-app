// React routers and hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// ContextAPI
import { LoginContext } from "./components/Context/LoginContext";
import { CartContext } from "./components/Context/CartContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import Dashboard from "./components/ProtectedRoutes/Dashboard/Dashboard";
import AdminProductsAdd from "./components/Products/AdminProductsAdd";
import AdminProductsEdit from "./components/Products/AdminProductsEdit";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ThankYou from "./components/Checkout/ThankYou";
import Orders from "./components/Orders/Orders";

function App() {
  const token = localStorage.getItem("token");
  const initAuth = !!token;
  const [authenticated, setAuthenticated] = useState(initAuth);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <LoginContext.Provider value={{ authenticated, setAuthenticated }}>
            <CartContext.Provider value={{ cartItems, setCartItems }}>
              <div className="min-vh-100">
                <Navbar />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/shop" element={<Products />} />
                  <Route
                    path="/admin/products/add"
                    element={<AdminProductsAdd />}
                  />
                  <Route
                    path="/admin/products/edit"
                    element={<AdminProductsEdit />}
                  />
                  <Route path="/shop/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/thank-you" element={<ThankYou />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
              <Footer />
            </CartContext.Provider>
          </LoginContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
