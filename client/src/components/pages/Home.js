import React, { useState, useEffect } from "react";
import { get, post, generateUID } from "../../utilities";
import { socket } from "../../client-socket.js";

import SideBar from "../modules/SideBar.js";
import Player from "../modules/Player.js";

import "../../utilities.css";
import "./Home.css";

const Home = (props) => {
  const [user, setUser] = useState("");
  const [song, setSong] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [showPicker, setShowPicker] = useState(false);

  const socketHelper = (test) => {
    console.log("home socket got something to", song.code,'test:',test);
    setSong(song)
  };

  //Set up song state given song id
  const initSong = (songId) => {
    console.log("initting song with", songId);
    get(`/api/song`, { songId: songId }).then((gSong) => {
      console.log("got", gSong);
      setSong(gSong);
    });
  };

  //Get user from prop or whoami
  useEffect(() => {
    if (props.userId) {
      setUser(props.userId);
      console.log("entered home as", props.userId._id, props.userId.name);
      get("/api/songByCreator", { creator_id: props.userId._id }).then((song) => {
        if (song.length == 0) {
          setSong(-1);
        } else {
          setSong(song[0]);
        }
      });
    } else {
      console.log("no props.userId");
      get("/api/whoami").then((user) => {
        console.log("user api call with", user);
        get("/api/songByCreator", { creator_id: user._id }).then((song) => {
          if (song.length > 0) {
            initSong(song[0]._id);
          } else {
            setSong(-1);
          }
        });
      });
    }
  }, []);

  //When song is changed, setup the screen
  useEffect(() => {
    console.log("song changed", song);
    if (song != -1 && song != undefined) {
      console.log("!!song is defined:", song, 'code:',song.code);
      socket.on(song.code, socketHelper);
      setLoading(false);
    } else if (song == -1 && user._id != undefined) {
      const body = {
        name: "New Song",
        tracks: [],
        code: generateUID(),
      };
      post("/api/song", body).then((res) => {
        setSong(res);
      });
    }
  }, [song]);

  if (loading) {
    return <div>Home screen loading</div>;
  }
  return (
    <>
      <div className="home-background">
        <div className="home-container u-flex">
          <SideBar
            selected={selected}
            setSelected={setSelected}
            songProp={song}
            setShowPicker={setShowPicker}
          />
          <div className="home-line"></div>
          <Player
            user={user}
            selected={selected}
            song={song}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
