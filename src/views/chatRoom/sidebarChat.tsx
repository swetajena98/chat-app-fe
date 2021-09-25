import { Avatar } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
interface chatBoxProps {
  userInfo: any;
}
const SidebarChat: React.FC<chatBoxProps> = (props: any) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);

  return (
    <div
      className={`sidebar-chat ${
        isActive === props.userInfo._id && "activeChat"
      }`}
      onClick={() => {
        setUserInfo(props.userInfo);
        setActive(true);
      }}
    >
      <Avatar />
      <div className="chatInfo" key="props.userInfo._id">
        <h2>{props.userInfo.name}</h2>
        <p>last text</p>
      </div>
    </div>
  );
};

export default SidebarChat;
