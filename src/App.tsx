import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layout/navbar";
import ChatRoom from "./views/chatRoom";
import HomePage from "./views/homePage";
import LoginForm from "./views/loginForm";
import RegisterForm from "./views/registrationForm";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";

const App: React.FC = () => {
  const { isLoggedIn, getLoggedIn, userDetails } = useContext(AuthContext);
  console.log(isLoggedIn);
  return (
    <AuthContextProvider>
      <Router>
        <NavBar></NavBar>
        <Switch>
          {isLoggedIn === true && (
            <Route exact path="/chatroom">
              <ChatRoom />
            </Route>
          )}

          <Route exact path="/">
            <HomePage />
          </Route>
          {isLoggedIn === false && (
            <>
              <Route exact path="/register">
                <RegisterForm></RegisterForm>
              </Route>
              <Route exact path="/login">
                <LoginForm></LoginForm>
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
