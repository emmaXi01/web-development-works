import React, { useState } from 'react';
import { fetchLogin } from './services';
import messages from './messages';
import spinner from './spinner.svg';

const Login = ({ onLogin }) => {

  // This state is all local to the component
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const performLogin = () => {
    if(!username) {
      setError(messages.USERNAME_REQUIRED);
      return;
    }
    // set output for while we wait
    setError('');
    setIsLoading(true);
    // start service call
    fetchLogin(username)
    .then( (userInfo) => {
      onLogin(userInfo.username); // inform parent
    })
    .catch( (err) => {
      setError(messages[err.code || 'DEFAULT']);
      setIsLoading(false);
    });
  };

  return (
    <div className="login">
      <p className="error">{error}</p>
      <input onChange={ (e) => setUsername(e.target.value) }/>
      { isLoading ?
          <img alt="spinner" src={spinner}/> :
          <button onClick={ performLogin }>Login</button>
      }
    </div>
  );

};

export default Login;
