import { createContext, useContext, useState } from "react";
import usersService from "../services/usersService";

const fn_error_context_must_be_used = () => {
  throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
  user: null,
  login: fn_error_context_must_be_used,
  logout: fn_error_context_must_be_used,
  signUp: fn_error_context_must_be_used,
});
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usersService.getUser());

  const refreshUser = (user) => setUser(user);

  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    refreshUser(response);

    return response;
  };

  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider
      value={{ user, login, logout, signUp: usersService.createUser }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
