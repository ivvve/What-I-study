import React from 'react';

function Hello(props) {
  console.log(props);
  const style = {
    backgroundColor: 'yellow'
  }

  return <div style={style}>안녕하세요 {props.name}</div>
}

Hello.defaultProps = {
  name: "default name"
};

export default Hello;
