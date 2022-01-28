import React, { useState, useEffect } from "react";
import { post } from "../../utilities.js";
import {useNavigate} from '@reach/router';

import "./SideBar.css";
import logo from "../../public/logo.png";
import logoText from "../../public/logo-text.png";
import NewTrack from "./NewTrack.js";
import Track from "./Track.js";

const SideBar = ({ selected, songProp, setSelected, setShowPicker }) => {
  const navigate = useNavigate();
  const [song, setSong] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSong(songProp);
  }, []);

  const addNewTrack = () => {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let tracksCopy = song.tracks.concat([
      { name: "Track", type: "Piano", color: "#" + randomColor, start: 16, end: 48 },
    ]);
    const body = {
      creator_id: song.creator_id,
      tracks: tracksCopy,
    };
    post("/api/updatesong", body).then((updatedSong) => {
      setSong(updatedSong);
    });
  };

  useEffect(() => {
    setLoading(false);
  }, [song]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo-container u-flex">
          <img onClick = {()=>{navigate('/')}} className="sidebar-logo" src={logo} />
          <img onClick = {()=>{navigate('/')}} className="sidebar-logo-text" src={logoText} />
        </div>
        <div className="sidebar-line"></div>
        {song.tracks.map((trackObj, index) => {
          return (
            <Track
              key={trackObj._id.toString()}
              id={trackObj._id.toString()}
              num={index}
              highlight={selected === trackObj._id.toString()}
              name={trackObj.name}
              type={trackObj.type}
              clickFunction={setSelected}
              setShowPicker={setShowPicker}
              notes={trackObj.notes}
              creator_name={song.creator_name}
              creator_id={song.creator_id}
            />
          );
        })}
        <NewTrack num={song.tracks.length} addNewTrack={addNewTrack} setShowPicker={setShowPicker} />
      </div>
    </>
  );
};

export default SideBar;
