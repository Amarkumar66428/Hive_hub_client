// hooks/useDebouncedCallback.js
import { useRef, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebouncedCallback = (callback, delay) => {
  const callbackRef = useRef(callback);

  // Always keep latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = useCallback(
    debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );

  // Cancel on unmount
  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
};
