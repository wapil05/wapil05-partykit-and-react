import React from "react";
import { useRef } from "react";
import { useUnoContext } from "./state-context";

export function LoginView() {
  const { login } = useUnoContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputRef.current && inputRef.current.value !== "") {
          login(inputRef.current.value);
        }
      }}
    >
      <input ref={inputRef} type="text" name="username" />
      <button type="submit">Login</button>
    </form>
  );
}
