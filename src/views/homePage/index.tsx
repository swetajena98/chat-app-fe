import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import "./index.css";
const HomePage: React.FC = () => {
  return (
    <div className="homePage">
      <div className="home-div">
        <p className="blue">
          <b>Welcome</b>
        </p>
        <h1 style={{ fontSize: "40px" }}>The Chat Application</h1>
      </div>
    </div>
  );
};

export default HomePage;
