import React, {useState} from 'react';
import { login } from '../services';
import errMessages from '../messages';
import spinner from '../spinner.svg';
import logo from '../logo.jpg'

function Login({ onLogin }) {
    const[newUsername, setNewUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    

    const onTextChange = (e) => {
        setNewUsername(e.target.value);
    };

    const performLogin = () => {
        if(!newUsername || newUsername.trim() === "") {
            setErrorText(errMessages.username_required);
            return;
        }

        setErrorText('');
        setIsLoading(true);

        login(newUsername)
        .then( (user) => {
            onLogin(user.username)
        })
        .catch( (err) => {
            setErrorText(errMessages[err.errorCode]);
            setIsLoading(false);
        });
    };

    return(
        <div className="login-container">
            <div className="logo">
                <img className="app-logo" src={logo} alt="logo"/>
            </div>
            <h4 className="greeting">hello :)</h4>
            <p className="error">{errorText}</p>
            <div className="login-body">
                <input className="username" onChange={onTextChange} value={newUsername}/> 
                { isLoading ?
                    <img alt="spinner" src={spinner}/> :
                    <button className="to-login" onClick={ performLogin }>Login</button> 
                }
            </div>       
        </div>
    );
}

export default Login;