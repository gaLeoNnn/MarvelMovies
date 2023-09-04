import "./appHeader.scss";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <a href="#">
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink end to="/MarvelMovies" style={({ isActive }) => ({ color: isActive ? "red" : null })}>
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink to="/comics" style={({ isActive }) => ({ color: isActive ? "red" : null })}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
