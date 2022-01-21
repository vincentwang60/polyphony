import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Welcome from "./pages/Welcome.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js"

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        console.log('logged in with user id', user._id)
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar />
      <Router>
        <Welcome path="/"/>
        <Home path="/home" />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
