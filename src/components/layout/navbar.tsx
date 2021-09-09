import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogOutAvatar from "../LogOutAvatar";
import "./navBar.css";

const NavBar: React.FC = () => {
  const { isLoggedIn, getLoggedIn, userDetails } = useContext(AuthContext);
  useEffect(() => {
    // result !== undefined && setResult(result.data.user.name);
  }, [isLoggedIn]);
  return (
    <div className="navigationBar">
      <Link className="linkText" to="/">
        Home
      </Link>
      <div>
        {isLoggedIn === true && (
          <>
            <Link
              className="linkText"
              to="/chatroom"
              style={{ marginRight: "100px" }}
            >
              CHATROOM
            </Link>
            <span style={{ marginRight: "100px" }}>
              <LogOutAvatar
                userName={userDetails?.name}
                userEmail={userDetails?.email}
              ></LogOutAvatar>
            </span>
          </>
        )}

        {isLoggedIn === false && (
          <>
            <Link
              className="linkText"
              to="/register"
              style={{ marginRight: "80px" }}
            >
              Register
            </Link>
            <Link className="linkText" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
