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
