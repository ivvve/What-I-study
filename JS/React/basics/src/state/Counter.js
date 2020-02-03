import React, {useState} from 'react';

function Counter() {
  const [count, setCounter] = useState(0);

  const onIncrease = () => {
    // setCounter(count + 1);
    setCounter(c => c + 1); // 함수형 업데이트
  }

  const onDecrease = () => {
    // setCounter(count - 1);
    setCounter(c => c - 1); // 함수형 업데이트
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}

export default Counter;
