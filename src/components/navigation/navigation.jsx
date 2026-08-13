import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import styles from "./navigation.module.css";

import burgerIcon from "/src/assets/burger_icon.svg";
import xIcon from "/src/assets/x_icon.svg";

import logo from "../../assets/logo.png";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <img src={logo} alt="Logo" className={styles.logo} />

      <div
        className={`${styles.burger} ${
          location.pathname === "/backoffice" ? styles.black : ""
        }`}
        onClick={toggleMenu}
      >
        <img
          src={menuOpen ? xIcon : burgerIcon}
          alt={menuOpen ? "Luk menu" : "Åbn menu"}
        />
      </div>

      <ul
        className={`${styles.navLinks} ${
          menuOpen ? styles.navLinksActive : ""
        }`}
      >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Forside <br />
          </NavLink>

          <NavLink
            to="/personalet"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Personalet <br />
          </NavLink>

          <NavLink
            to="/kontakt"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Kontakt <br />
          </NavLink>

          <NavLink
            to="/kurv"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Kurv <br />
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setMenuOpen(false)}
          >
            Login <br />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;