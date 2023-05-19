import shopLogo from "../../assets/shop-logo.png";
import { CartWidget } from "./CartWidget";
import { NavLink } from "react-router-dom";

import "../../styles/NavBar.css";

export const Navbar = (background) => {


  /* ${mostrarNavbar ? '' : 'd-none'} */
  return (
    <header className={`header bg-${background}`}>
      <nav className={`navbar navbar-expand-lg fw-bold `}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" aria-current="page" to="/">
            <img
              className="img-fluid"
              style={{ width: "6em" }}
              src={shopLogo}
              alt="Shop Logo"
            />HOME
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarS"
            aria-controls="navbarS"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarS">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item fw-bold">
                <NavLink className="nav-link btn btn-outline-info mx-1" to={"/category/celulares"}>
                  Celulares
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link btn btn-outline-info mx-1" to={"/category/smartTv"}>
                  Smart TV
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link btn btn-outline-info mx-1" to={"/category/smartWatch"}>
                  Smart Watch
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link btn btn-outline-info mx-1" to={"/category/minicomponentes"}>
                  Minicomponentes
                </NavLink>
              </li>
              <li className="nav-item fw-bold">
                <NavLink className="nav-link btn btn-outline-info mx-1 mb-sm-1" to={"/category/auriculares"}>
                  Auriculares
                </NavLink>
              </li>
            </ul>
            <div className="cartWidget">
              <CartWidget />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}