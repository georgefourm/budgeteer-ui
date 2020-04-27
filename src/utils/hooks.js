import { useEffect, useRef } from "react";

export function useKeyBinding(key, callback) {
  const handler = (event) => {
    if (!event.isComposing && event.key === key) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", handler);
    return () => document.removeEventListener("keyup", handler);
  });
}

export const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};
