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
  const [firstLoad, setFirstLoad] = useState(true);

  const socketHelper = (newSong) => {
    setSong(newSong);
  };

  //Set up song state given song id
  const initSong = (songId) => {
    get(`/api/song`, { songId: songId }).then((gSong) => {
      setSong(gSong);
    });
  };

  //Get user from prop or whoami
  useEffect(() => {
    if (props.userId) {
      setUser(props.userId);
      get("/api/songByCreator", { creator_id: props.userId._id }).then((song) => {
        if (song.length == 0) {
          setSong(-1);
        } else {
          setSong(song[0]);
        }
      });
    } else {
      get("/api/whoami").then((user) => {
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
    console.log('hs song changed!')
    if (song != -1 && song != undefined) {
      if (firstLoad) {
        socket.on(song.code, socketHelper);
        setFirstLoad(false);
      }
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
            setSong={setSong}
            setSelected={setSelected}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
