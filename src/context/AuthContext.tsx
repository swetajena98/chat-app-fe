import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext: any = createContext(true);

const AuthContextProvider: React.FC = (props: any) => {
  const [isLoggedIn, setIsloggedIn] = useState<any>();
  const [userDetails, setUserDetails] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();

  const getLoggedIn = async () => {
    const result = await axios.get(
      "http://localhost:8571/auth/isLoggedIn",

      {
        withCredentials: true,
      }
    );
    setIsloggedIn(result.data.responseData);
    setUserDetails(result.data.user);
  };
  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, getLoggedIn, userDetails, userInfo, setUserInfo }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export { AuthContextProvider };
