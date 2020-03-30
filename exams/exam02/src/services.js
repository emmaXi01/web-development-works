
export const fetchRecipes = () => {
    return fetch('/recipes', {
        method: "GET",   
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return response.json();
    });
};

export const fetchRecipeDetails = (recipeId) => {
    return fetch(`/recipes/${recipeId}`, {
        method: 'GET',
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return response.json();
    });
};

export const fetchLogin = (username) => {
    return fetch('/session', {
        method: "POST",
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return response.json();
    });
};

export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return;
    });
};

export const fetchNewRecipeForm = () => {
    return fetch('/newRecipe', {
        method: 'GET',
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return;
    });

};

export const createNewRecipe = ({ title, ingredients, instructions }) => {
    return fetch('/newRecipe', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ title, ingredients, instructions }),
        credentials: 'include',
    })
    .catch( () => Promise.reject({ errorCode: 'network-error' }))
    .then( (response) => {
        if(!response.ok) {
            return response.json().then( (err) => Promise.reject(err) );
        }

        return response.json();
    });
};

export const logout = () => {
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