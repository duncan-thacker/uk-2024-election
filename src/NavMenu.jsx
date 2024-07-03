import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <nav>
      <Link to="/">Constituencies</Link>&middot;
      <Link to="/results">Full results</Link>&middot;
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
