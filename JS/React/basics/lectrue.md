## JSX 기본 규칙

Babel이 JSX를 JS로 변환해준다.

```jsx
(
	<div>
    	<span>Hello React</span>
    </div>
)
```

```js
// JS로 변환된 JSX
"use strict";

React.createElement("div", null, React.createElement("span", null, "Hello React"));
```

1. tag는 꼭 닫혀야한다.
<Hello></Hello>
<Hello/>: self closing tag

`<br>` 안됨

2. 2개 이상의 태그는 하나의 태그로 감싸져야한다.

3. javascript 값을 사용하고 싶을 땐 {}로 감싼다

function Hello() {
  const name = 'devson';
  return <div>안녕하세요 {name}</div>
}
 
4. css
그냥 불러오기만 하면 됨

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (

인라

function Hello() {
  const name = 'devson';
  const style = {
    backgroundColor: 'yellow'
  }

  return <div style={style}>안녕하세요 {name}</div>
}

5. class 대신 className

6. 주석
{/* comments */}

<Hello
  // comments
/>

## props

function App() {
  return (
    <>
      <Hello name="react"/>
      <Hello/>
    </>
  );
}

```jsx
function Hello(props) {
  console.log(props);

  return <div>안녕하세요 {props.name}</div>
}

// default props
Hello.defaultProps = {
  name: "default name"
};

export default Hello;
```
