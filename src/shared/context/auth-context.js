/* Niko Icardo
7/28/21 */
import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null, 
  login: () => {},
  logout: () => {},
});
