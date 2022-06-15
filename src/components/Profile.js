import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");

  async function userAction(url) {
    const response = await fetch("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    setUser(myJson);
  }

  async function updateUser() {
    const response = await fetch("/users/me/", {
      method: "POST",
      body: JSON.stringify({
        name: "username",
        email: "email@gmail.com",
        password: "password",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    console.log(myJson);
  }
  useEffect(() => {
    userAction();
  }, []);

  const updateUserInfo = (e, username, email, password) => {
    e.preventDefault();
    updateUser();
  };

  async function updateProfile(body) {
    const response = await fetch("/users/me/", {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    console.log(myJson);
  }

  //   updateProfile();

  const update = (e, email, name, pass) => {
    e.preventDefault();
    updateProfile({
      name: name,
      email: email,
      password: pass,
    });
    window.location.reload();
  };

  return (
    <div className="profile">
      <h3>Profile</h3>
      <div>name: {user?.name}</div>
      <div>email: {user?.email}</div>
      <form onSubmit={(e) => update(e, email, name, pass)}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="password"
          placeholder="Name"
          required
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          name="password"
          placeholder="Password"
          required
        />
        <input type="submit" name="" value="Submit" className="login" />
      </form>
    </div>
  );
};

export default Profile;
