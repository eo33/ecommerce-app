// React routers and hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// ContextAPI
import { LoginContext } from "./components/Context/LoginContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import Dashboard from "./components/ProtectedRoutes/Dashboard/Dashboard";
import AdminProductsAdd from "./components/Products/AdminProductsAdd";
import AdminProductsEdit from "./components/Products/AdminProductsEdit";
import ProductDetails from "./components/Products/ProductDetails";

function App() {
  const token = localStorage.getItem("token");
  const initAuth = !!token;
  const [authenticated, setAuthenticated] = useState(initAuth);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <LoginContext.Provider value={{ authenticated, setAuthenticated }}>
            <div className="min-vh-100">
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/admin/products/add"
                  element={<AdminProductsAdd />}
                />
                <Route
                  path="/admin/products/edit"
                  element={<AdminProductsEdit />}
                />
                <Route path="/items/:id" element={<ProductDetails />} />
              </Routes>
            </div>
            <Footer />
          </LoginContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
