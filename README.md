# useDerivedStateFromProps

> 问题来源 - [使用 React hooks 如何只让下面这段代码的子组件只 render 一次？ - 知乎
> ](https://www.zhihu.com/question/444068787)

useDerivedStateFromProps:

```typescript
import { useState, useMemo, useRef } from "react";

export default function useDerivedStateFromProps<T>(s: T) {
  const stateRef = useRef<T>(s);
  const [_, forceUpdate] = useState({});

  useMemo(() => {
    stateRef.current = s;
  }, [s]);

  function setState(v: T | ((v: T) => T)) {
    stateRef.current = isFunction(v) ? v(stateRef.current) : v;
    forceUpdate({});
  }

  return [stateRef.current, setState] as [T, (v: T | ((v: T) => T)) => void];
}

function isFunction(params: any): params is (...args: any[]) => any {
  return typeof params === "function";
}
```

具体使用：

```typescript
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
```

如排名第一的回答[苏晗若](https://www.zhihu.com/people/su-han-ruo)所言，问题要实现的便是类组件内`getDerivedStateFromProps`的功能。

原理回答内已经很明白了，再次不赘述，以上代码用比较符合`useState`使用直觉的方式做的封装，无论如何组织代码，最终实现效果一致,没有优劣之分。
