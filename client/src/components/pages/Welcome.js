import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useNavigate } from "@reach/router";

import "../../utilities.css";
import "./Welcome.css";
import bg from "../../public/bg.png";
import logo from "../../public/logo.png";
import logoText from "../../public/logo-text.png";

const GOOGLE_CLIENT_ID = "925980344728-79s8r1a4938de6j4kg2mrpitnh2ndtbs.apps.googleusercontent.com";

const Welcome = ({ userId, handleLogin, handleLogout }) => {
  const navigate = useNavigate();

  const success = (res) => {
    handleLogin(res).then(()=>{navigate('/home')})
  }

  return (
    <>
      <div className="container">
        <img className="image" src={bg} />
        <img className="logo" src={logo} />
        <img className="logo-text" src={logoText} />
        <p className="text">Collaborative</p>
        <p className="text text-2">music</p>
        <p className="text text-3">creation</p>
        <p className="text text-4">in minutes</p>
        <p className="text text-s">
          Use our intuitive drag-and-drop system to create songs together and share with the world
        </p>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <div className="button-container u-flex" onClick={renderProps.onClick}>
              <div className="button-text">Get Started </div>
            </div>
          )}
          buttonText="Login"
          onSuccess={(res)=>{success(res)}}
          onFailure={(err) => console.log(err)}
        />
      </div>
    </>
  );
};

export default Welcome;
