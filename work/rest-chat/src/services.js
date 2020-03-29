"use strict";
export const fetchLogin = (username) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ errorCode: 'network-error'}) )
    . then( (response) => {
        if(!response.ok) {
            return response.json().then( err => Promise.reject(err) );
        }
        return response.json();
    });
};

export const fetchMessage = () => {
    return fetch('/chat', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }
        return response.json();
    });
};

export const fetchSendMessage = (text) => {
    return fetch('/chat', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ text }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return response.json();
    });
};

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        })
    })
    .catch( () => Promise.reject({errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) )
        }
        return;
    });
};
