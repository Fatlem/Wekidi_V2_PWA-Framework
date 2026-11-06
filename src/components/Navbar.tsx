import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="nav-container">
        <nav className="nav" aria-label="Navigasi utama">
          <div className="nav-brand">
            <h1>
              <Link to="/">
                Wekidi<span>くん</span>
              </Link>
            </h1>
          </div>

          <div className="nav-menu">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>

          <div className="profile">
            {user ? (
              <>
                <span className="profile-name" title={user.email}>
                  Hi, {user.name}
                </span>
                <button type="button" className="btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/register" className="btn">
                Register
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
