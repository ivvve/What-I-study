import React from 'react';
import Hello from "./Hello";
import Wrapper from "./Wrapper";
import Counter from "./state/Counter";
import InputSample2 from "./state/InputSample2";
import ClockAndFocus from "./ref/ClickAndFocus";

function App() {
  return (
    <>
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
