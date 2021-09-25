import React, { useEffect } from "react";
import Chat from "./chat";
import "./index.css";
import SideBar from "./sideBar";
const ChatRoom: React.FC = () => {
  return (
    <div className="app">
      <div className="app-body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatRoom;
