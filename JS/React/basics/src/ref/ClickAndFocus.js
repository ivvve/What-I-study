import React, {useRef} from "react";

function ClockAndFocus() {
  const nameInput = useRef();

  const onClick = () => {
    nameInput.current.focus();
  };

  return (
    <div>
      <input name="name" ref={nameInput}/>
      <button onClick={onClick}>Focus!</button>
    </div>
  )
}

export default ClockAndFocus;
