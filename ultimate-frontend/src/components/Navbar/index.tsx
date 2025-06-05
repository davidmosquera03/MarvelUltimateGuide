import { Link } from "react-router-dom";
import "./styles.css";
function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <Link to="/home">
          <h2>Ultimate Guide</h2>
        </Link>
        <Link to="/calendar">
          <p>Calendar</p>
        </Link>
        <Link to="/series-portal">
          <p>Series</p>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
