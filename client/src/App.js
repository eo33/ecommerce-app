// React routers and hooks
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// ContextAPI
import { LoginContext } from "./components/Context/LoginContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/ProtectedRoutes/Dashboard/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //const token = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            <div className="min-vh-100">
              <Navbar />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
