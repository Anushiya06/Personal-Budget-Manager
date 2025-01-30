import { Link } from "react-router-dom";
import "../style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <ul className="navbar-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/budget">Budget</Link>
        </li>
        <li>
          <Link to="/expense-input">Add Expense</Link>
        </li>
        <li>
          <Link to="/expense-list">Expenses</Link>
        </li>
        <li>
          <Link to="/summary">Summary</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
