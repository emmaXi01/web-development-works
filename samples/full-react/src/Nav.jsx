import React from 'react';

import { fetchLogout } from './services';

const Nav = ({ user, onLogout }) => {
  const logout = () => {
    fetchLogout()
    .then( () => onLogout() );
  };
  return (
    <ul className='nav'>
      { user.username && <li>{user.username}</li> }
      { user.isLoggedIn &&
          <li
            className="logout action"
            onClick={logout}
          >Logout</li> }
    </ul>
  );
};

export default Nav;
