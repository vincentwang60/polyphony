import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Welcome.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "925980344728-79s8r1a4938de6j4kg2mrpitnh2ndtbs.apps.googleusercontent.com"
const Home = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        setUser(user.name);
      }
    });
  }, []);
  console.log("entered home");
  return (
    <>
      <div className="container">
        <div className="textContainer u-flex">
          <div className="text u-flex">Home Screen</div>
          <div className="text u-flex">Welcome, {user}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
