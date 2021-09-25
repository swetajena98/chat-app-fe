import { Avatar, IconButton } from "@material-ui/core";
import {
  ChatOutlined,
  DonutLargeOutlined,
  MoreVert,
  SearchOutlined,
  SettingsRemoteSharp,
} from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiURL } from "../../constants";
import "./index.css";
import SidebarChat from "./sidebarChat";

const SideBar = () => {
  const [res, setRes] = useState<any>();
  const getUsers = async () => {
    const result = await axios.get(apiURL + "/auth/getAllUsersData", {
      withCredentials: true,
    });
    result && setRes(result.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-header_right">
          <IconButton>
            <DonutLargeOutlined />
          </IconButton>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="search contacts"></input>
        </div>
      </div>

      <div className="sidebar-chats">
        {res?.map((item: any) => (
          <SidebarChat userInfo={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
