import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  // Login context
  const { authenticated, setAuthenticated } = useContext(LoginContext);
  // To route to dashboard after signing up
  const navigate = useNavigate();

  // States for navigation bar
  const [toggleNavBar, setToggleNavBar] = useState(true);

  return (
    <nav class="navbar navbar-expand-lg border-3 border-secondary border-bottom">
      <div class="container-fluid">
        <Link class="navbar-brand" to="./">
          <img
            src="./assets/logo.jpeg"
            width="auto"
            height="50"
            class="d-inline-block align-top"
            alt=""
          />
        </Link>
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
                <Link class="nav-link" to="/#">
                  Main
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <ul class="navbar-nav mb-2 mb-lg-0 text-dark">
            <li class="nav-item ml-auto">
              {authenticated ? (
                <button
                  class="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    setAuthenticated(false);
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
