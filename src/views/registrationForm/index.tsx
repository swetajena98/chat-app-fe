import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import "./index.css";
import logo from "../../images/20945760.jpg";
import { apiURL } from "../../constants";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const { Title } = Typography;
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register() {
    try {
      const registerData = {
        name,
        email,
        password,
        passwordVerify,
      };

      await axios.post(apiURL + "/auth/", registerData, {
        withCredentials: true,
      });

      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F3F1F1",
        height: "100vh",
        position: "relative",
      }}
    >
      <Card className="cardX">
        <div>
          <img src={logo} height="400px"></img>
        </div>
        <div style={{ marginTop: "6vh" }}>
          <Form onFinish={register}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <div className="formField">
                <Title level={5}>Username: </Title>
                <Input onChange={(e) => setName(e.target.value)} value={name} />
              </div>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <div className="formField">
                <Title level={5}>Email: </Title>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <div className="formField">
                <Title level={5}>Password: </Title>
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
            </Form.Item>
            <Form.Item
              name="passwordVerify"
              rules={[
                {
                  required: true,
                  message: "Please re-enter your password!",
                },
              ]}
            >
              <div className="formField">
                <Title level={5}>Confirm Password: </Title> &nbsp;&nbsp;&nbsp;
                <Input.Password
                  onChange={(e) => setPasswordVerify(e.target.value)}
                  value={passwordVerify}
                />
              </div>
            </Form.Item>
            <br /> <br />
            <button type="submit" className="registerBtn">
              Register
            </button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
