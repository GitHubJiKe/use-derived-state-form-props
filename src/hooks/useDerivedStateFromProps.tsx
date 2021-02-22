import { useState, useMemo, useRef } from "react";

export default function useDerivedStateFromProps<T>(s: T) {
  const stateRef = useRef<T>(s);
  const [_, forceUpdate] = useState({});

  useMemo(() => {
    stateRef.current = s;
  }, [s]);

  function setState(s: T | ((s: T) => T)) {
    stateRef.current = isFunction(s) ? s(stateRef.current) : s;
    forceUpdate({});
  }

  return [stateRef.current, setState] as [T, (s: T | ((s: T) => T)) => void];
}

function isFunction(params: any): params is (...args: any[]) => any {
  return typeof params === "function";
}
