import React, {useState, useEffect} from 'react';
import errMessages from './errMessages';
import { fetchLoginStatus, login, logout } from './services';
import ChatRoom from './ChatRoom/ChatRoom';
import Login from './Login';

import './App.css';

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');

  useEffect( () => {
    fetchLoginStatus()
    .then( uid => {
      setUserState({
        isLoggedIn: true
      });
      setUid(uid);
    });
  }, []);

  const onLogin = (username) => {
    login(username)
    .then( uid => {
      setUserState({
        isLoggedIn: true
      });
      setUid(uid);
      setError('');
    })
    .catch( (err) => {
      setError(err.errorCode);
    });
  };

  const onLogout = () => {
    logout()
    .then( () => {
      setUserState({
        isLoggedIn: false
      });
      setUid('');
      setError('');   
    })
  };

  const trackUserState  = () => {
    setUserState({
      isLoggedIn: false
    });
  };

  const trackError = (err) => {
    setError(err.errorCode);
  };

  let content;
  if(userState.isLoggedIn) {
    content = <ChatRoom uid={uid} trackUserState={trackUserState} onLogout={onLogout} trackError={trackError}/>;
  } else {
    content = <Login error={error} onLogin={onLogin}/>;
  };

  return(
    <div className="chat-app">
      <div className="status">{errMessages[error]}</div>
      { content }
    </div>
  )

};

export default App;
