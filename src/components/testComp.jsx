import { useState, useRef, useEffect } from 'react';
import useInterval from './useinterval.js';

export default function TestComp() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}
