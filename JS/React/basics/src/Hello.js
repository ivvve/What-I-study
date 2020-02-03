import React from 'react';

function Hello(props) {
  const { isSpecial } = props;

  console.log(props);
  const style = {
    backgroundColor: 'yellow'
  }

  if (isSpecial) {
    return <div>**</div>
  }

  return <div style={style}>안녕하세요 {props.name}</div>
}

Hello.defaultProps = {
  name: "default name"
};

export default Hello;
