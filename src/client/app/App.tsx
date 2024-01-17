import React from "react";
import { UnoContext } from "./state-context";
import { LoginView } from "./LoginView";
import { useUno } from "./useUno";

export const App = () => {
  const { loading, state, login } = useUno();

  if (loading) {
    return "connecting";
  }

  return (
    <UnoContext.Provider value={{ state, login }}>
      {state.view === "Login" && <LoginView />}
      {state.view === "Game" && "Further logic"}
    </UnoContext.Provider>
  );
};
