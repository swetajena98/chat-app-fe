import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover, Row } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "../index.css";
import AuthContext from "../context/AuthContext";
import { apiURL } from "../constants";

interface logOutProps {
  userName: any;
  userEmail: any;
}

const LogOutAvatar: React.FC<logOutProps> = (props) => {
  //   const userInfo = getUserInformation();
  const history = useHistory();
  const { getLoggedIn } = useContext(AuthContext);
  const logoutUser = async () => {
    await axios.get(apiURL + "/auth/logout", {
      withCredentials: true,
    });
    await getLoggedIn();
    history.push("/login");
    // document.cookie =
    //   "token" + "=" + "" + "; expires=" + new Date(0) + "; path=" + "/";
    // console.log(document.cookie);
  };

  const getAvatarClickMenu = (userName: any, userEmail: any) => {
    return (
      <div className="signout-popup">
        <Row>
          <b>{userName}</b>
        </Row>
        <Row>({userEmail})</Row>
        <br />
        <Button className="signout-btn" onClick={() => logoutUser()}>
          {" "}
          Sign out
        </Button>
      </div>
    );
  };

  // if (userInfo) {
  //   const userName = userInfo.userName;
  //   const userEmail = userInfo.userEmail;
  //   const AvatarSymbol = userName.substring(0, 1);

  return (
    <>
      {props.userEmail ? (
        <Popover
          style={{ pointerEvents: "visible" }}
          content={getAvatarClickMenu(props.userName, props.userEmail)}
        >
          <Avatar className="user-detail-avatar">{<UserOutlined />}</Avatar>
        </Popover>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default LogOutAvatar;
