const auth = {
  isPermitted: (username) => {
    // this would also be where a password would be checked
    if(!username) {
      return false;
    }
    if(username.toLowerCase() === 'dog') {
      return false;
    }
    // whitelist allowed characters and length
    if(! username.match(/^[A-Za-z0-9_-]{2,26}$/)) {
      return false;
    }
    return true;
  },
};

module.exports = auth;
