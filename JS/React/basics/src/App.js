import React, {useRef} from 'react';
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./state/Counter";
import InputSample2 from "./state/InputSample2";
import ClockAndFocus from "./ref/ClickAndFocus";
import UserList from "./UserList";

function App() {
  const nextId = useRef(4);

  const onCreate = () => {
    console.log(nextId.current); // 4
    nextId.current += 1; // 기존 값에 1 더함
  }

  return (
    <>
      <UserList/>

      <ClockAndFocus/>

      <InputSample2/>

      <Counter/>

      <Wrapper>
        <Hello name="react" isSpecial={true}/>
        <Hello/>
      </Wrapper>
    </>
  );
}

export default App;
