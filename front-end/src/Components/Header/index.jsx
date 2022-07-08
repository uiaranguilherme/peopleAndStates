import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './styles.module.css';
import {
  BsBank as HomeIcon,
  BsFillFlagFill as StatesIcon,
  BsFillGeoAltFill as MapIcon
} from './../../Icons/icons';
function Header() {
  return (
    <header className={style.Header}>
      <div>
        <HomeIcon />
      </div>
      <nav className={style.Nav}>
        <NavLink className={style.Link}
          style={({ isActive }) => {
            return {
              color: isActive ? '#6500B0' : '',
              backgroundColor: isActive ? '#D396FF' : '',
              opacity: '1',
            }
          }}
          to="/">
          <StatesIcon /> <section> Dashboard </section></NavLink>

        <NavLink className={style.Link}
          style={({ isActive }) => {
            return {
              color: isActive ? '#6500B0' : '',
              backgroundColor: isActive ? '#D396FF' : '',
            }
          }}
          to="/maps"><MapIcon /> <section> Mapa </section></NavLink>
      </nav>
    </header>
  );
}

export default Header;