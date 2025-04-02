import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  console.log('Counter component rendered');
  console.log('Initial count:', count);

  const handleIncrement = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      console.log('Increment button clicked, new count:', newCount);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount(prevCount => {
      const newCount = prevCount - 1;
      console.log('Decrement button clicked, new count:', newCount);
      return newCount;
    });
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
