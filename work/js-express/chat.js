const chat = {
    users: {
        
    },

    messages: [
        
    ],

    addMessage: function({ sender, text, timestamp = new Date() }) {
        if(sender && text) {
            chat.users[sender] = sender;
            chat.messages.push({ sender, text, timestamp});
        }
    }
};

module.exports = chat;
