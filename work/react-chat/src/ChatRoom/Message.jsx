import React from 'react';

function Message({ message }) {
    return(
        <li className="message-info">
            <div className="meta-info">
                <span className="sender">{message.sender}</span>
                <span className="timestamp">{message.timeStamp}</span>
            </div>
            <div className="text-info">
                <span className="message-text">{message.text}</span>
            </div>
        </li>      
    );
};

export default Message;