import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <nav style={{ display: 'flex', columnGap: 12, padding: 12 }}>
      <Link to="/">Constituencies</Link>•
      <Link to="/results">Full results</Link>•
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
