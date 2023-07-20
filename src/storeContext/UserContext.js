/** @format */

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState("");
  console.log(balance);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("my-app-token"));
    // console.log(token);

    if (!token) {
      axios
        .get(`http://localhost:5555/api/users/authorize-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
          setAuthenticated(true);
          console.log(authenticated);

          setUserName(response.data.userName);
          setUserId(response.data.userId);
        })
        .catch((err) => {
          console.log("error mes", err);

          if (err)
            localStorage.removeItem("my-app-token");
          console.log(err.message);
        });
      console.log(authenticated);
    }
  }, [authenticated]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        authenticated,
        userName,
        setUserName,
        setAuthenticated,
        balance,
        setBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
