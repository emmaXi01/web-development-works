import React from 'react';
import { logout } from '../services';
import logo from '../logo.jpg'

function Nav({ username, onLogout, onBack }) {

    const handleLogout = () => {
        logout()
        .then( () => onLogout() );
    };
    
    const back = () => {
        onBack(username)
    }
    
    return (
        <nav className="header">
            <ul>
                <li><img className="nav-logo" src={logo} alt="logo"/></li>
                <li className="app-name"><span onClick={back} >JobTrackerXi</span></li>
                <span>
                    <li>{username}</li> 
                    <li className="to-logout" onClick={handleLogout}>Logout</li>
                </span>     
            </ul>
        </nav>
        
    );
};


export default Nav;