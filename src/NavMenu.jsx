import { NavLink } from "react-router-dom";
import './NavMenu.css';

export default function NavMenu() {
  return (
    <nav style={{ display: 'flex', columnGap: 12, padding: 12 }}>
      <NavLink to="/">Constituencies</NavLink>•
      <NavLink to="/results">Full results</NavLink>•
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
}
