const chatWeb = {
    getUserList: function(users){
        return `<ul class="users"> `+ 
        Object.values(users).map(user => {
            return `
            <li>
                <div class="user">
                    <span>${user}</span>
                </div>
            </li>
            `;
        }).join('\n') + 
        `</ul>`;
    },

    getMessageList: function(messages){
        return `<ol class="messages">` +
            messages.map(message => {
                return `
                <li>
                    <div class=message>
                        <div class="meta-info">
                            <div class="sender-info">
                                <span class="username">${message.sender}</span>
                            </div>
                            <div class="message-info">
                                    <span class="timestamp">${message.timestamp.toLocaleTimeString()}</span>
                            </div> 
                        </div>
                            <p class="message-text">${message.text}</p>
                    </div> 
                </li>
                `;
            }).join('\n') + 
            `</ol>`;
    },

    renderChatPage: function(chat){
        return `
        <!doctype html>
        <html>
        <head>
            <title>chatapp</title>
            <link rel="stylesheet" href="chat.css">
        </head>
        <body>
            <div id="chat-app">
                <div class="display-panel">
                    ${chatWeb.getUserList(chat.users)}
                    ${chatWeb.getMessageList(chat.messages)}
                </div>
                ${chatWeb.getOutGoing()}
            </div>  
        </body>
    </html>
    `;
    },

    getOutGoing: function() {
        return `
        <div class="outgoing">
            <form action="/sendMessage" method="POST">
                <input class="new-username" type="text" name="sender" value="" placeholder="Enter username"/>
                <input class="to-send" type="text" name="text" value="" placeholder="Enter message to send"/>
                <button type="submit">send</button>
            </form>
        </div> 
        `;
    }
};
module.exports = chatWeb;
