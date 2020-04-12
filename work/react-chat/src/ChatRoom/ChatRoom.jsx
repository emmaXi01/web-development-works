import React, {useState, useEffect} from 'react';
import UserList from './UserList';
import MessageList from './MessageList';
import AddMessage from './AddMessage';
import { fetchUsers, fetchMessages, sendMessage } from '../services';

function ChatRoom({ uid, trackUserState, onLogout, trackError }) {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const updateUserList = () => {
        fetchUsers()
        .then( (users) => {
            setUsers(users);
        })
        .catch( (err) => {
            trackError(err);
            trackUserState();
        });
    };
    
    const updateMessageList = () => {
        fetchMessages()
        .then( (messages) => {
            setMessages(messages);
        })
        .catch( (err) => {
            trackError(err);
            trackUserState();
        });
    };

    useEffect( () => {
        if(uid) {
            updateUserList();
            updateMessageList();
            const intervalId = setInterval( () => {
                updateUserList();
                updateMessageList();
            }, 3000);
        
            return function cleanup() {
                clearInterval(intervalId);
            };
        }
    },[uid]);

    const onAdd =  text  => {
        sendMessage({ text })
        .then( (messages) => {
            setMessages(messages);
        })
        .catch( (err) => {
            trackError(err);
        })
    };

    const handleLogout = () => {
        onLogout();
    };

    return( 
        <div className="chat-panel">
             <h1 className="title">Chat Room</h1>        
             <div className="logout">
                <button className="to-logout" onClick={handleLogout}>Sign out</button>
             </div>
             <div className="display-panel">
                <UserList users={users}/>
                <MessageList messages={messages}/>
             </div>
             <div className="outgoing">
                <AddMessage onAdd={onAdd}/>    
             </div>     
        </div>
    )
};

export default ChatRoom;