// React routers and hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// ContextAPI
import { LoginContext } from "./components/Context/LoginContext";
import { CartContext } from "./components/Context/CartContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ThankYou from "./components/Checkout/ThankYou";
import Orders from "./components/Orders/Orders";

import AdminHomepage from "./components/Admin/AdminHomepage";
import Sidebar from "./components/Admin/Sidebar";
import Unauthorized from "./components/Admin/Unauthorized";
import AdminProductsAdd from "./components/Products/AdminProductsAdd";
import AdminProductsEdit from "./components/Products/AdminProductsEdit";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminUsers from "./components/Admin/AdminUsers";

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

  if (authenticated === false) {
    localStorage.clear("token");
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <LoginContext.Provider value={{ authenticated, setAuthenticated }}>
            <CartContext.Provider value={{ cartItems, setCartItems }}>
              <div className="min-vh-100">
                <Navbar isAdmin={adminAuthorization} />
                <Routes>
                  {/**Public route */}
                  <Route
                    element={
                      adminAuthorization === false ? null : (
                        <> You can't access regular pages as admin</>
                      )
                    }
                  >
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/shop" element={<Products />} />
                    <Route path="/shop/:id" element={<ProductDetails />} />
                    {/**Logged in user routes*/}
                    {authenticated ? (
                      <>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                          path="/checkout/thank-you"
                          element={<ThankYou />}
                        />
                        <Route path="/orders" element={<Orders />} />
                      </>
                    ) : null}
                  </Route>
                  {/**Admin routes */}
                  <Route
                    path="/admin"
                    element={
                      adminAuthorization ? <Sidebar /> : <Unauthorized />
                    }
                  >
                    <Route index element={<AdminHomepage />} />
                    {/**Orders route */}
                    <Route
                      path="orders/:orderStatus?"
                      element={<AdminOrders />}
                    />
                    {/**Products route */}
                    <Route path="products" element={<AdminProductsEdit />} />
                    <Route path="products/add" element={<AdminProductsAdd />} />
                    {/**Users route */}
                    <Route path="users" element={<AdminUsers />} />
                  </Route>
                  {/**Not found */}
                  <Route path="*" element={<h2>404 Not found</h2>} />
                </Routes>
              </div>
              <Footer isAdmin={adminAuthorization} />
            </CartContext.Provider>
          </LoginContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
