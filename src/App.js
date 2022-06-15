import React, { useState } from "react";
import Tabs from "./components/Tabs";
import Tab from "./components/Tab";
import LogIn from "./components/LogIn";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfrirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState([]);
  async function userAction(url, met, Body = null, token = null) {
    const response = await fetch(url, {
      method: met,
      body: JSON.stringify(Body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const myJson = await response.json();
    window.localStorage.setItem("tokenKey", myJson.token);
    console.log(myJson);
    return myJson;
  }

  const userCreation = (e, username, email, password) => {
    e.preventDefault();
    userAction("users", "POST", {
      name: username,
      email: email,
      password: password,
    }).then((data) =>
      userAction("users/login", "POST", {
        name: username,
        email: email,
        password: password,
      })
    );
  };

  return (
    <Tabs>
      <Tab title="Register">
        <div class="input_data">
          <form onSubmit={(e) => userCreation(e, username, email, password)}>
            <input
              type="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setConfrirmPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              placeholder="Email"
              required
            />
            <input type="submit" name="" value="Submit" className="home" />
          </form>
        </div>
      </Tab>
      <Tab title="Tasks">
        <Tasks />
      </Tab>
      <Tab title="Log in">
        <LogIn />
      </Tab>
      <Tab title="Profile">
        <Profile user={user} />
      </Tab>
    </Tabs>
  );
};
export default App;
