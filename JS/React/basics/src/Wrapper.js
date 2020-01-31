import React from 'react';

function Wrapper({ children }) {
  return (
    <div style={{ color: 'red' }}>
      {children}
    </div>
  )
}

export default Wrapper;

