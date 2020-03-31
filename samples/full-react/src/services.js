const convertNetworkError = (err) => {
  return {
    code: 'NETWORK-ERROR',
    err
  };
};

const convertServiceError = (err) => Promise.reject(err);

export const fetchLoginStatus = (username) => {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      // This service happens to give error messages as JSON
      return response.json().then(convertServiceError);
    }
    return response.json();
  });
};

export const fetchLogin = (username) => {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( convertNetworkError )
  .then( response => {
    if(!response.ok) {
      // This service happens to give error messages as JSON
      return response.json().then( convertServiceError );
    }
    return response.json();
  });
};

export const fetchLogout = () => {
  return fetch('/session', {
    method: 'DELETE',
  })
  .catch( convertNetworkError)
  .then( response => {
    // this service has limited options in return data
    return response.ok;
  });
};

