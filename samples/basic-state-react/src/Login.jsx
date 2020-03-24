import React, { useState } from 'react';
import { login } from './services';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState();

  return (
    <div>
      Username: <input onChange={ e => {
        setUsername(e.target.value);
      }}/>
    <button onClick={ () =>  {
      login(username)
      .then( result => {
        onLogin(result.isLoggedIn);
      })
      .catch( () => {
        // No error handling in sample
      });
    }}>Login</button>
    </div>
  );
};

export default Login;
