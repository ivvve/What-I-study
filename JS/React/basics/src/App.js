import React from 'react';
import Hello from "./Hello";
import Wrapper from "./Wrapper";

function App() {
  return (
    <>
      <Wrapper>
        <Hello name="react"/>
        <Hello/>
      </Wrapper>
    </>
  );
}

export default App;
