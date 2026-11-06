import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HomeIcon, InfoIcon, LogoutIcon, MenuBookIcon, UserIcon } from "./Icons";

/** Bar navigasi bawah — hanya tampil di layar HP (lihat .bottom-nav di global.css). */
export default function BottomNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bottom-nav" aria-label="Navigasi bawah">
      <NavLink to="/" end className="bn-item">
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/menu" className="bn-item">
        <MenuBookIcon />
        <span>Menu</span>
      </NavLink>
      <NavLink to="/about" className="bn-item">
        <InfoIcon />
        <span>About</span>
      </NavLink>
      {user ? (
        <button type="button" className="bn-item" onClick={logout} title={user.email}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      ) : (
        <NavLink to="/register" className="bn-item">
          <UserIcon />
          <span>Register</span>
        </NavLink>
      )}
    </nav>
  );
}
