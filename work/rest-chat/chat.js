"use strict";
const users = {
    "11":{
        username: "Amit",   
    },

    "43":{
        username:"Bao",
    }
};

const messages = [
    {
        sender: "Amit",
        timeStamp: new Date("2020-03-20 10:00:00").toLocaleTimeString(),
        text: "You up?",
    },

    {
        sender: "Bao",
        timeStamp: new Date("2020-03-20 10:02:00").toLocaleTimeString(),
        text: "Yeah, still working on this INFO6250 work.",
    },

    {
        sender: "Amit",
        timeStamp: new Date("2020-03-20 10:03:20").toLocaleTimeString(),
        text: "Fighting!",
    },

];

function addMessage({ sender, text, timeStamp = new Date().toLocaleTimeString() }) {
    messages.push( { sender, text, timeStamp });
}

const chat = {
    users,
    messages,
    addMessage,
}

module.exports = chat;
    