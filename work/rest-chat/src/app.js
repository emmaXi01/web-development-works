"use strict";
import {
    fetchLogin,
    fetchMessage,
    fetchSendMessage,
    fetchLogout,
} from './services';

const login = document.querySelector('.login-panel');
const status = document.querySelector('.status');
const chatRoom = document.querySelector('.chat-panel');

//error messages
const errMessages = {
    'invalid-user': "User not found, please login!",
    'invalid-username': "Bad login, Please enter a valid user name without containing whitespace and 'dog'!",
    'network-error': "There is a problem connecting to the network, try again!",
    'missing-text': "The message content cannot be empty",
}

const appState = {
    pollId: null,
    isLoggedIn: false,
    users:[],
    messages:[],
    error:'',
}

function renderPage() {
    if(appState.isLoggedIn) {
        renderLogin(false);
        renderChatRoom(true);
    } else {
        renderLogin(true);
        renderChatRoom(false);
    }
    renderErrors(appState.error);
}

function renderLogin(show) {  
    if(show) {
        login.innerHTML = `
            <input class="user-name" type="text" placeholder="Enter a user name" />
            <button class="login-button" type="button">Sign in</button>
        `;
        login.querySelector('.login-button').disabled = true;
    } else {
        login.innerHTML=``;
    }
}

function renderErrors(error) {
    status.innerText = errMessages[error] || error;
}

function renderChatRoom(show) {
    if(show) {
        chatRoom.innerHTML = `
            <h1 class="title">Chat Room</h1>
            <div class="logout">
                <button class="logout-button" type="button">Sign out</button>
            </div>
            <div class="display-panel">
                <div class="users-panel">
                    <h3 class="title">Users</h3>
                    <ul class="users"></ul> 
                </div>
                <div class="messages-panel"> 
                    <h3 class="title">Chat Messages</h3>  
                    <ul class="messages"></ul> 
                </div>   
            </div>
            <div class="outgoing">
                <div>
                    <label>Message: </label>
                    <input class="to-add-message" type="text" placeholder="Enter a message" />
                    <button class="send-button" type="button">Send</button>
                </div>
            </div> 
        `;

        chatRoom.querySelector('.send-button').disabled = true;
        renderUsers(appState.users);
        renderMessages(appState.messages);
    } else {
        chatRoom.innerHTML = ``;
    } 
}

function renderUsers(users) {
    const usersList = chatRoom.querySelector('.users'); 
    usersList.innerHTML = users.map( (user) => `<li class="user"> ${user.username}</li>`).join('');
}

function renderMessages(messages) {
    const messageList = chatRoom.querySelector('.messages');
    messageList.innerHTML = messages.map( (message) => {
        return `
            <li class="message-info">
                <div class="meta-info">
                    <span class="sender">${message.sender}</span>
                    <span class="timestamp">${message.timeStamp}</span>
                </div>
                <div class="text-info">
                    <span class="message-text">${message.text}</span>
                </div>
            </li>
            `;
    }).join(' ');
}


//login
login.addEventListener('click', (event) => {
    if(!event.target.classList.contains('login-button')) {
        return;
    }

    const addUser = login.querySelector('.user-name');
    const username = addUser.value;
    addUser.value = '';

    fetchLogin(username)
    .then( (chat) => {
        appState.isLoggedIn = true;
        appState.users = Object.values(chat.users);
        appState.messages = chat.messages;
        appState.error = '';
        renderPage();
        poll(true);
    })
    .catch( (err) => {
        appState.error = err.errorCode;
        renderPage();
    });   
});

//get username
login.addEventListener('keyup', (event) => {
    if(!event.target.classList.contains('user-name')) {
        return;
    }
    
    const text = event.target.value;
    login.querySelector('.login-button').disabled = !text;
});


//polling
function poll(shouldPoll) {
    if(shouldPoll && !appState.pollId) {
        appState.pollId = setInterval( () => {
            fetchMessage()
            .then( (chat) => {
                appState.users = Object.values(chat.users);
                appState.messages = chat.messages;
                appState.error = '';
                renderUsers(appState.users);
                renderMessages(appState.messages);
            })
            .catch( (err) => {
                if(err.errorCode === 'invalid-user') {
                    appState.isLoggedIn = false;
                    appState.error = '';
                    renderPage();
                    poll(false);
                    return;
                }

                appState.error = err.errorCode;
                renderErrors(appState.error);
            });
        }, 3000);
    }
    
    //when a user lohout
    if(!shouldPoll && appState.pollId) {
        clearTimeout(appState.pollId);
        appState.pollId = null;
    }
}


//send message
chatRoom.addEventListener('click', (event) => {
    if(!event.target.classList.contains('send-button')) {
        return;
    }
    
    const addMessage = chatRoom.querySelector('.to-add-message');
    const text = addMessage.value;
    addMessage.value = '';

    fetchSendMessage(text)
    .then( (messages) => {
        appState.messages = messages;
        renderPage();
    })
    .catch( (err) => {
        appState.error = err.errorCode;
        renderPage();
    });
});

//get message
chatRoom.addEventListener('keyup', (event) => {
    if(!event.target.classList.contains('to-add-message')) {
        return;
    }

    const text = event.target.value;
    chatRoom.querySelector('.send-button').disabled = !text;
});


//logout
chatRoom.addEventListener('click', (event) => {
    if(!event.target.classList.contains('logout-button')) {
        return;
    }

    fetchLogout()
    .then( () => {
        appState.isLoggedIn = false;
        appState.users = [];
        appState.message = [];
        appState.error = '';
        poll(false);
        renderPage();  
    })
    .catch( (err) => {
        appState.error = err.errorCode;   
        poll(false);
        renderPage();
    })
});


//initial load
fetchMessage()
.then( (chat) => {
    appState.users = Object.values(chat.users);
    appState.messages = chat.messages;
    appState.error = '';
    appState.isLoggedIn = true;
    renderPage();
    poll(true);
})
.catch( (err) => {
    appState.isLoggedIn = false;
    poll(false);
    renderPage();
});






