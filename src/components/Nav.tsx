import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Candidate Search</h1>
      <ul style={styles.navList}>
        <li><Link to="/" style={styles.link}>🏠 Inicio</Link></li>
        <li><Link to="/saved" style={styles.link}>⭐ Candidatos Guardados</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#282c34",
    color: "white",
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Nav;
