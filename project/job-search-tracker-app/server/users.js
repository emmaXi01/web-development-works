"use strict";
const { v4: uuidv4 } = require('uuid');
const auth = require('./auth');

const users = {};

const isValidSession = uid => {
    if( !uid || !users[uid] || users[uid].expires < Date.now() ) {
        return false;
    }

    return true;
}

const createUser = (username) => {
    if(!auth.isPermitted) {
        return false;
    }

    const uid = uuidv4();
    users[uid] = {
        username,
        uid,
        expires: Date.now() + 1000 * 60 * 5,
    };
    return users[uid];
}

const getUser = (uid) => {
    return users[uid];
}

const removeUser = (uid) => {
    delete users[uid];
}

const canReadUser = ({ uid, username }) => {
    if( !uid || !username || !users[uid].username === username ) {
        return false;
    }
    return true;
}

module.exports = {
    isValidSession,
    createUser,
    getUser,
    removeUser,
    canReadUser,
};