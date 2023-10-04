import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div className="min-vh-100">
            <Navbar />
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginPage
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
