import React from "react";
import {NextPageContext} from "next";

interface UserListProps {
  users: User[];
}

interface User {
  id: string;
  name: string;
  age: number;
}

function UserList({ users }: UserListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

UserList.getInitialProps = (ctx: NextPageContext) => {
  const { users } = ctx.query;
  return { users };
};

export default UserList;
