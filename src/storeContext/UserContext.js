/** @format */

import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");


  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        authenticated,
        userName,
        setUserName,
        setAuthenticated,
        // balance,
        // setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
