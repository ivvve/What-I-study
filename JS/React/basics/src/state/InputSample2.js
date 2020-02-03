import React, {useState} from "react";

function InputSample2() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  })

  const { name, nickname } = inputs;

  const onChange = (event) => {
    const { name, value } = event.target;
    const nextInputs = {
      ...inputs,
      [name]: value // 덮어 씌우기
    };
    setInputs(nextInputs);
  }

  const onReset = () => {
    setInputs({ name: '', nickname: '' });
  }

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name}/>
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>이름: {name}</b>
        <b>닉네임: {nickname}</b>
      </div>
    </div>
  )
}

export default InputSample2;
