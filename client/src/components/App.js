import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Welcome from "./pages/Welcome.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import Help from "./modules/Help.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUserId(user);
      }
    });
  }, []);

  const handleLogin = async (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    await post("/api/login", { token: userToken }).then((user) => {
      setUserId(user);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar setShowHelp={setShowHelp}/>
      <Router>
        <Welcome setShowHelp={setShowHelp} path="/"handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Home path="/home" userId={userId} />
        <NotFound default />
      </Router>
      <Help setShowHelp={setShowHelp} show={showHelp} />
    </>
  );
};

export default App;
