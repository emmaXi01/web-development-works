import React from 'react';

const SecretStuff = ({ user }) => {
  return (
    <div>
      <p>Welcome to the Secret Stuff, {user.username}</p>
    </div>
  );
};

export default SecretStuff;
