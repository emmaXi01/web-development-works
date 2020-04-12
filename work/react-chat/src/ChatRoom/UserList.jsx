import React from 'react';

function UserList({ users }) {
    const userList = users.map( user => <li className="user" key={user.uid}>{user.username}</li>);
    return(
        <ul className="users-list">
            <h3 className="title">Users</h3>
            {userList}
        </ul>
    );
};

export default UserList;
