import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";

function NavBar(props) {
  const { user } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-sm shadow-sm"
      aria-label="Fifth navbar example"
      style={{ background: "var(--navbar-bg)" }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        {props.darkMode()}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          {!user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sign-in" className="nav-link">
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sign-up" className="nav-link">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
          {user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <form>
                  <input
                    onChange={(e) => props.setSearch(e.target.value)}
                    className="form-control"
                    type="search"
                    placeholder="Search"
                  />
                </form>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              {user && user.isBusiness && (
                <li className="nav-item">
                  <NavLink to="/create-card" className="nav-link">
                    Create card
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/my-cards" className="nav-link">
                  My cards
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fav-cards" className="nav-link">
                  Favorite cards
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sign-out" className="nav-link">
                  Sign out
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
