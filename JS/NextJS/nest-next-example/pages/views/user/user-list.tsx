import {useEffect, useState} from "react";
import {User} from "../../../src/user/user.entity";

interface UserListProps {
  message: string;
}

export default function UserList({message}: UserListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/users')
      .then(data => data.json())
      .then((users: User[]) => {
        setUsers(users);
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <>
      <h1>User List</h1>

      <table>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
        </tr>
        {
          (users.length === 0) ?
            <tr>
              <td colSpan={3}>User not found</td>
            </tr> :
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>
            ))
        }
      </table>
    </>
  )
}

