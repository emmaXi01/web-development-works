const chatWeb = {
  chatPage: function(chat, user) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/chat.css"/>
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat, user)}
              ${chatWeb.getMessageList(chat, user)}
            </div>
            ${chatWeb.getOutgoing(chat, user)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      chat.messages.map( message => `
        <li>
          <div class="message">
            <div class="meta-info">
              <div class="sender-info">
                <span class="username">${chat.users[message.sender].username}</span>

              </div>
              <div class="message-info">
                <span class="timestamp">${message.timestamp}</span>
              </div>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        </li>
      `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
      Object.values(chat.users).filter( user => user.active).map( user => `
      <li>
        <div class="user">
          <span class="username">${user.username}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getLogin: function(chat) {
    return `
      <div class="outgoing">
        <form action="/sendUser" method="POST">
          <label>Username:<input name="username" placeholder="Who are you?"/></label>
          <button type="submit">Login</button>
        </form>
      </div>
    `;
  },
  getCreateMessage: function(chat) {
    return `
      <div class="outgoing">
        <form action="/sendMessage" method="POST">
          <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
          <button type="submit">Send</button>
        </form>
        <form action="/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </div>
    `;
  },

  getOutgoing: function(chat, user) {
    if(user) {
      return chatWeb.getCreateMessage(chat);
    }
    return chatWeb.getLogin(chat);
  }
};
module.exports = chatWeb;
