import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // Login context
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  // To route to dashboard after signing up
  const navigate = useNavigate();

  // States for navigation bar
  const [toggleNavBar, setToggleNavBar] = useState(true);

  return (
    <nav class="navbar navbar-expand-lg border-3 border-secondary border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="./">
          <img
            src="./assets/logo.jpeg"
            width="auto"
            height="50"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          onClick={() => setToggleNavBar((e) => !e)}
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class={`${toggleNavBar ? "collapse" : ""} navbar-collapse `}>
          <div className="col d-flex justify-content-start">
            <ul class="navbar-nav mb-2 mb-lg-0 text-dark">
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  Main
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/#">
                  Shop
                </a>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav mb-2 mb-lg-0 text-dark">
            <li class="nav-item ml-auto">
              {loggedIn ? (
                <button
                  class="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    setLoggedIn(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <a class="nav-link" href="/login">
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
