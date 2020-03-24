import React from 'react';

const Counter = ({ count, changeCount }) => {
  return (
    <div>
      <button onClick={ () => changeCount(count-1) }>-</button>
      {count}
      <button onClick={ () => changeCount(count+1) }>+</button>
    </div>
  );
};

export default Counter;
