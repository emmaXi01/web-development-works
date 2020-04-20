const convertNetworkError = (err) => {
    return {
        message: 'network error',
        err
    };
};

const convertServiceError = (err) => Promise.reject(err);

//session
export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
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
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return response.json();
    });
};

export const logout = () => {
    return fetch('/session', {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return;
    });
};

//job appliaction
export const fetchJobList = (username) => {
    return fetch(`/jobs/${username}`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return response.json();
    });
};

export const addJob = ( username, job ) => {
    return fetch(`/jobs/${username}`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ job }),
        credentials: 'include',
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return response.json();
    });
};

export const fetchJob = (username, jobId) => {
    return fetch(`/jobs/${username}/${jobId}`, {
        method: 'GET',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return response.json();
    });
};

export const removeJob = ( username, jobId ) => {
    return fetch(`/jobs/${username}/${jobId}`, {
        method: 'DELETE',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        credentials: 'include',
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return;
    });
};

export const updateJob = (username, jobId, job) => {
    return fetch(`/jobs/${username}/${jobId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ job }),
        credentials: 'include',
    })
    .catch( convertNetworkError )
    .then( response => {
        if(!response.ok) {
            return response.json().then( convertServiceError );
        }

        return response.json();
    });
};
