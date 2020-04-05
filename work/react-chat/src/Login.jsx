import React, {useState} from 'react';

function Login({ error, onLogin }) {
    const[username, setUsername] = useState('');

    const onTextChange = (e) => {
        setUsername(e.target.value);
    };

    const submitUser = () => {
        if(username) {
            onLogin(username);
            setUsername('');
        }
    };

    return(
        <div className="login-panel">
            <input className="username" onChange={onTextChange} value={username}/>
            <button className="to-login" onClick={submitUser}>Sign in</button>
        </div>
    )
}

export default Login;