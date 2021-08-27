import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  name: null,
  roomId: null,
  logIn: () => {},
  roomJoin: () => {},
});
