/** @format */

import { useReducer } from "react";
import { AuthContext } from "../authContext/AuthContext";
import { authReducer, initialUserState } from "../authReducer/authReducer";

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialUserState);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
