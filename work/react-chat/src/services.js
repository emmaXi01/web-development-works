export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return response.json();
    });
};

export const login = (username) => {
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

export const fetchUsers = () => {
    return fetch('/users', {
        method: 'GET',
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
};

export const fetchMessages = () => {
    return fetch('/messages', {
        method: 'GET',
        credentials: 'include',  // use cookie
    })
    .catch( () => Promise.reject({ errorCode: 'network-error'}) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }
        return response.json();
    });
};

export const sendMessage = ({ text }) => {
    return fetch('/messages', {
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

export const logout = () => {
    return fetch('/session', {
        method: 'DELETE',
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }) )
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( err => Promise.reject(err));
        }
        return;
    });
};