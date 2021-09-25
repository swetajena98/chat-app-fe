import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Alert, Button, Card, Divider, Form, Input, Typography } from "antd";
import "../../index.css";
import login from "../../images/3071357.jpg";
import { apiURL } from "../../constants";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { Title } = Typography;
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function logIn() {
    try {
      const loginData = {
        email,
        password,
      };

      const result = await axios.post(apiURL + "/auth/login", loginData, {
        withCredentials: true,
      });
      console.log(result);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      setError("Invalid ID or password!!!");
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
        <div style={{ marginTop: "6vh" }}>
          {error !== "" && (
            <Alert
              message={error}
              type="error"
              style={{ color: "red", marginLeft: "30px" }}
            />
          )}
          <Form onFinish={logIn}>
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  value={password}
                />
              </div>
            </Form.Item>
            <br /> <br />
            <Button htmlType="submit" type="primary" className="loginBtn">
              Login
            </Button>
          </Form>
        </div>
        <div>
          <img src={login} height="300px"></img>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
