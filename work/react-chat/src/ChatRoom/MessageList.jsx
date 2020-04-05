import React from 'react';
import Message from './Message';

function MessageList({ messages }) {
    const messageList = messages.map((text, index) => <Message key={index} message={text}/>);
    return(
        <ul className="messages-list">
            <h3 className="title">Chat Messages</h3>  
            {messageList}
        </ul>
    );
};

export default MessageList;

