import React, {useRef, useState} from 'react';
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./state/Counter";
import InputSample2 from "./state/InputSample2";
import ClockAndFocus from "./ref/ClickAndFocus";
import UserList from "./ref/UserList";
import CreateUser from "./ref/CreateUser";

function App() {
  const [users, setUsers] = useState([
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
    }
  ]);

  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });

  const { username, email } = inputs;

  // 컴포넌트가 re-rendering 되도 이 값은 계속 갖고있다.
  const nextId = useRef(4);

  const onCreate = () => {
    const user = { id: nextId.current, username, email }
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });

    console.log(nextId.current); // 4
    nextId.current += 1; // 값 증가
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onRemove = (id) => {
    const filteredUser = users.filter(user => user.id !== id);
    setUsers(filteredUser);
  };

  const onToggle = (id) => {
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}/>

      <UserList
        users={users}
        onRemove={onRemove}/>
    </>
  );
}

export default App;
