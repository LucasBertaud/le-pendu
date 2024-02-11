import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate();

  function navigateTo(route) {
    if (route == "home") {
      navigate('/');
    } else {
      navigate(`/${route}`);
    }
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className="nav__link">Accueil</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/play" className="nav__link">Jouer</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/stats" className="nav__link">Statistiques</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav