import React from "react";

function User({ user, onRemove }) {
  const { id, username, email, active } =  user;

  return (
    <div>
      {id} /
      <b style={{
        color: active ? 'green' : 'black',
        cursor: 'pointer'
      }}>{username}</b> /
      {email}
      <button onClick={() => onRemove(id)}>delete</button>
    </div>
  )
}

function UserList({ users, onRemove }) {
  return (
    <div>
      {users.map(user => <User key={user.id} user={user} onRemove={onRemove}/>)}
    </div>
  )
}

export default UserList;
