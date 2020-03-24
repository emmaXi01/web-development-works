export login = (username) => {
  // More to come later, this shows how the proxy line avoids CORS issues
  fetch(`/session`, {
    method: 'POST',
    // This is just fake authentication for sample
    // Here is where we'd send the username
  })
  // Skipping error handling in sample
  .then( response => response.json() )
};
