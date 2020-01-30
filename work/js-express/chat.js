const chat = {
    users: {
        Bob: 'Bob',
        Emma: 'Emma',
    },

    messages: [
        {
            sender: 'Bob',
            timestamp: new Date(),
            text: 'Do you have lunch?'
        },

        {
            sender: 'Emma',
            timestamp: new Date(),
            text: 'No, still learning INFO 6250.'

        }
    ],

    addMessage: function({ sender, text, timestamp = new Date() }) {
        if(sender && text) {
            chat.users[sender] = sender;
            chat.messages.push({ sender, text, timestamp});
        }
    }
};

module.exports = chat;
