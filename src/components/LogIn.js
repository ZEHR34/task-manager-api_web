import React, { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function userAction(url, met, Body = null) {
    const response = await fetch(url, {
      method: met,
      body: JSON.stringify(Body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    console.log(myJson);
    window.localStorage.setItem("tokenKey", myJson.token);
    return myJson;
  }

  const loginHandle = (e, email, password) => {
    e.preventDefault();
    userAction("/users/login", "POST", {
      email: email,
      password: password,
    });
  };
  return (
    <form class="input_data" onSubmit={(e) => loginHandle(e, email, password)}>
      <h1>Log In</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="Password"
        required
      />
      <input type="submit" name="" value="Submit" className="login" />
    </form>
  );
};

export default LogIn;
