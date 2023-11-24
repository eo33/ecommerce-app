// React routers and hooks
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// ContextAPI
import { LoginContext } from "./components/Context/LoginContext";
import { CartContext } from "./components/Context/CartContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import Dashboard from "./components/ProtectedRoutes/Dashboard/Dashboard";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ThankYou from "./components/Checkout/ThankYou";
import Orders from "./components/Orders/Orders";

import Admin from "./components/Admin/Admin";
import AdminHomepage from "./components/Admin/AdminHomepage";

import Unauthorized from "./components/Admin/Unauthorized";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminProductsAdd from "./components/Products/AdminProductsAdd";
import AdminProductsEdit from "./components/Products/AdminProductsEdit";

function App() {
  const token = localStorage.getItem("token");
  const initAuth = token;
  const [authenticated, setAuthenticated] = useState(initAuth);
  const [adminAuthorization, setAdminAuthorization] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // validate token when user visit web
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get("/auth/validate", {
          headers: { Authorization: token },
        });
        setAuthenticated(res.data.authenticate);
        setAdminAuthorization(res.data.admin);
      } catch (err) {
        console.error(err);
      }
    };

    validateToken();
  }, [token]);

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
                  <Route path="/shop/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/thank-you" element={<ThankYou />} />
                  <Route path="/orders" element={<Orders />} />
                  {/**Admin routes */}
                  <Route
                    path="/admin"
                    element={adminAuthorization ? null : <Unauthorized />}
                  >
                    <Route index element={<AdminHomepage />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AdminProductsAdd />} />
                    <Route
                      path="products/edit"
                      element={<AdminProductsEdit />}
                    />
                  </Route>

                  {/**Not found */}
                  <Route path="*" element={<h2>404 Not found</h2>} />
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
