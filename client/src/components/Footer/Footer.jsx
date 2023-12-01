import React from "react";
import { Link } from "react-router-dom";

function Footer({ isAdmin }) {
  return (
    <div className="container">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 border-top">
        <p class="col-md-4 mb-0 text-muted">
          &copy; 2023 The Furniture Bros, Pty LTD
        </p>
        <Link
          to={isAdmin ? "/admin" : "/"}
          class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src="./assets/logo.jpeg"
            width="40"
            height="32"
            class=""
            alt=""
          />
        </Link>
        {isAdmin ? null : (
          <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item">
              <Link to="/" class="nav-link px-2 text-muted">
                Main
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/shop" class="nav-link px-2 text-muted">
                Shop
              </Link>
            </li>
          </ul>
        )}
      </footer>
    </div>
  );
}
export default Footer;
