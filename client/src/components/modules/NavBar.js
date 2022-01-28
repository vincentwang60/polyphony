import React, { useState, useEffect } from "react";

import {
  AiFillGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiFillQuestionCircle,
} from "react-icons/ai";
import "./NavBar.css";

const NavBar = (props) => {
  const [opacity, setOpacity] = useState(0);
  const [clickedEmail, setClickedEmail] = useState(false);
  function OpenInNewTabWinBrowser(url) {
    let win = window.open(url, "_blank");
    win.focus();
  }

  useEffect(() => {
    if (clickedEmail) {
      console.log("created interval");
      const i = setInterval(() => {
        setOpacity((oldOpacity) => oldOpacity - 0.05);
      }, 50);
      return () => {
        clearInterval(i);
      };
    } else {
      setClickedEmail(false);
    }
  }, [clickedEmail]);

  useEffect(() => {
    if (opacity <= 0) {
      setClickedEmail(false);
    }
  }, [opacity]);

  return (
    <>
      <nav className="NavBar-container u-flex">
        <div className="NavBar-linksContainer u-flex">
          <AiOutlineLinkedin
            onClick={() => {
              OpenInNewTabWinBrowser("https://www.linkedin.com/in/vkwang/");
            }}
            size="4vh"
            className="NavBar-linkedin"
          />
          <AiFillGithub
            onClick={() => {
              OpenInNewTabWinBrowser("https://github.com/vincentwang60");
            }}
            size="4vh"
            className="NavBar-linkedin"
          />
          <AiOutlineMail
            onClick={() => {
              setClickedEmail(true);
              setOpacity(1);
              navigator.clipboard.writeText("vkwang@mit.edu");
            }}
            size="4vh"
            className="NavBar-linkedin"
          />
          <div className="NavBar-copied" style={{ opacity: opacity }}>
            Email copied to clipboard!
          </div>

          <div className="NavBar-bottomLine"></div>
        </div>
        <AiFillQuestionCircle
          onClick={() => {
            props.setShowHelp(true)
          }}
          size="4vh"
          className="NavBar-help"
        />
      </nav>
    </>
  );
};

export default NavBar;
