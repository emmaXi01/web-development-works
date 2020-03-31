import React, { useState, useEffect } from 'react';

import { fetchLoginStatus } from './services';

import Nav from './Nav';
import SecretStuff from './SecretStuff';
import Login from './Login';
import './app.css';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false });

  // Runs when first rendered
  // AND whenever any vars in the passed array change
  // (None in this case)
  useEffect( () => {
    fetchLoginStatus()
    .then( userInfo => {
      setUserState({
        isLoggedIn: true,
        username: userInfo.username,
      });
    });
  }, []);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username
    });
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  let content;

  if(userState.isLoggedIn) {
    content = <SecretStuff user={userState}/>;
  } else {
    content = <Login onLogin={ login }/>;
  }

  return (
    <div className="app">
      <Nav user={userState} onLogout={logout}/>
      {content}
    </div>
  );
};

export default App;
