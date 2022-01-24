import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

import SideBar from "../modules/SideBar.js";
import Player from "../modules/Player.js";

import "../../utilities.css";
import "./Home.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const Home = () => {
  const [user, setUser] = useState("");
  const [song, setSong] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((gUser) => {
      if (gUser._id) {
        setUser(gUser);
        console.log("entered home as", gUser._id, gUser.name);
        get(`/api/song`, { creator_id: gUser._id }).then((gSong) => {
          if (gSong.length != 0) {
            setSong(gSong[0]);
          } else if (gSong.length == 0) {
            setSong(-1);
          }
        });
      } else {
        console.log("uh oh not logged in?");
      }
    });
  }, []);
  
  useEffect(() => {
    if (song != -1 && song != undefined) {
      console.log("song is defined!", song);
    } else if (song == -1) {
      console.log("No songs found for", user._id, song);
      const body = {
        name: "New Song",
        tracks: []
      };
      post("/api/song", body);
      console.log("Created new song:", body);
      get(`/api/song`, { creator_id: user._id }).then((song) => {
        if (song != []) {
          setSong(song[0]);
        }
      });
    }
  }, [song]);
  return (
    <>
      <div className="home-background">
        <div className="home-container u-flex">
          <SideBar song={song} />
          <Player song={song} />
        </div>
      </div>
    </>
  );
};

export default Home;
