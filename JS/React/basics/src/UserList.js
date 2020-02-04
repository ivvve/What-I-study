import React from "react";

function User({ user }) {
  const { id, username, email } =  user;
  return (
    <div>
      {id} / {username} / {email}
    </div>
  )
}

function UserList() {
  return (
    <div>
      {users.map(user => <User key={user.id} user={user}/>)}
    </div>
  )
}

export default UserList;

const users = [
  {
    id: 1,
    username: 'chris',
    email: 'chris@gmail.com'
  },
  {
    id: 2,
    username: 'chris2',
    email: 'chris2@gmail.com'
  },
  {
    id: 3,
    username: 'chris3',
    email: 'chris3@gmail.com'
  },
];
