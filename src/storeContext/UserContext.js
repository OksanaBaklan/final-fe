/** @format */

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");

  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("my-app-token"));
    console.log(token);

    if (token !== null) {
      axios
        .get(`http://localhost:5555/api/users/authorize-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
          setAuthenticated(true);
          setUserName(response.data.userName);
          setUserId(response.data.userId);
          //   setAvatar(response.data.data.avatar);
        })
        .catch((err) => {
          console.log("error mes", err);

          if (err.response.status === 401)
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
        avatar,
        setAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
