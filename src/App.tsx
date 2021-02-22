import React, { useState } from "react";
import useDerivedStateFromProps from "./hooks/useDerivedStateFromProps";

import "./App.css";

function Child({ count }: { count: number }) {
  const [num, setNum] = useDerivedStateFromProps<number>(count);

  console.log("child render");

  return (
    <>
      <h1>Child Count: {num}</h1>
      <button onClick={() => setNum((c) => c + 1)}>child num increase</button>
    </>
  );
}

const MemoChild = React.memo(Child);

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Parent Count: {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>
        parent count increase
      </button>
      <br />
      <MemoChild count={count} />
    </div>
  );
}

export default App;
