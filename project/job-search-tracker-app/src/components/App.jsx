import React, { useState, useEffect} from 'react';
import Login from './Login';
import JobTrackerApp from './jobs/JobTrackerApp';
import { fetchLoginStatus } from '../services';

import '../app.css';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, username: ''});
  
  useEffect( () => {
    fetchLoginStatus()
    .then(user => {
      setUserState({
        isLoggedIn: true,
        username: user.username,
      });
    });
  }, []);
 
  const onLogin = (username) => {
      setUserState({
        isLoggedIn: true,
        username: username,
      });
  };

  const onLogout = () => {
    setUserState({
      isLoggedIn: false,
      username: ''
    });
  }

  return(
    <div className="app">
      { userState.isLoggedIn ? 
          <JobTrackerApp username={userState.username} onLogout={onLogout} /> :
          <Login onLogin={onLogin} />
       }
    </div>
  );
};

export default App;
