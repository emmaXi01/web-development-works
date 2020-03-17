export const fetchLogIn = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json();
  });
};

export const fetchLoginStatus = () => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return Promise.reject({ code: 'login-invalid' });
    }
    return;
  });
};

export const fetchTodos = () => {
  return fetch('/todos', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (response) => {
    if(!response.ok) {
      return response.json().then( result => Promise.reject(result) );
    }
    return response.json();
  });

};
