import { createContext, useContext } from "react";
import type { UnoState } from "./useUno";

export const UnoContext = createContext<{
  state: UnoState;
  login: (username: string) => void;
}>({
  state: { view: "Login" },
  login: (username: string) => undefined,
});

export function useUnoContext() {
  const uno = useContext(UnoContext);

  return uno!;
}
