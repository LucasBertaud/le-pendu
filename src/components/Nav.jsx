import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate();

    function navigateTo (route) {
      if (route == "home") {
        navigate('/');
      }else{
        navigate(`/${route}`);
      }
    }

  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
                <NavLink to="/play">Jouer</NavLink>
            </li>
            <li>
                <NavLink to="/stats">Statistiques</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Nav