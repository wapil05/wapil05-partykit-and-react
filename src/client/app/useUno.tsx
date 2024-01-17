import PartySocket from "partysocket";
import { useMemo, useState, useReducer, useEffect } from "react";

declare const PARTYKIT_HOST: string;

export interface UnoState {
  view: "Login" | "Game";
}

function stateReducer(
  state: UnoState,
  action: { type: string; payload?: unknown }
): UnoState {
  if (action.type === "USER_LOGGED_IN") {
    return {
      ...state,
      view: "Game",
    };
  }

  return state;
}

export function useUno(): {
  loading: boolean;
  state: UnoState;
  login: (username: string) => void;
} {
  const connection = useMemo(() => {
    return new PartySocket({
      host: PARTYKIT_HOST,
      room: "my-new-room",
    });
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  const [state, dispatch] = useReducer(stateReducer, {
    view: "Login",
  });

  // Setup all listeners
  useEffect(() => {
    connection.addEventListener("open", () => {
      setLoading(false);
    });
    connection.addEventListener("message", (message) => {
      if (message.data.startsWith("Willkommen")) {
        dispatch({ type: "USER_LOGGED_IN" });
      }
    });
  }, [connection]);

  function login(username: string) {
    connection.send(`login:${username}`);
  }

  return {
    loading,
    state,
    login,
  };
}
