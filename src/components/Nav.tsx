import { NavLink } from "react-router-dom";
import "./Nav.css"; // Archivo de estilos separado

const Nav = () => {
  return (
    <nav className="nav">
      <h1 className="title">Candidate Search</h1>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
            🏠 Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved" className={({ isActive }) => isActive ? "active" : ""}>
            ⭐ Candidatos Guardados
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
