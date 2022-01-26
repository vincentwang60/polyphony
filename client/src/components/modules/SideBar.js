import React, { useState, useEffect } from "react";
import { post } from "../../utilities.js";

import "./SideBar.css";
import logo from "../../public/logo.png";
import logoText from "../../public/logo-text.png";
import NewTrack from "./NewTrack.js";
import Track from "./Track.js";

const SideBar = ({ selected, songProp, setSelected, setShowPicker }) => {
  const [song, setSong] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSong(songProp);
  }, []);

  const addNewTrack = () => {
    console.log("add new track to", song.tracks);
    let tracksCopy = song.tracks.concat([{ name: "New Track", type: "Piano" }]);
    console.log("tracksCopy", tracksCopy);
    const body = {
      creator_id: song.creator_id,
      tracks: tracksCopy,
    };
    post("/api/updatesong", body).then((updatedSong) => {
      console.log("sidebar updated song", song, "to", updatedSong.song);
      setSong(updatedSong.song);
    });
  };

  useEffect(()=>{
    setLoading(false)
  },[song])

  if(loading){
    return (
      <div>Loading</div>
    )
  }
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo-container u-flex">
          <img className="sidebar-logo" src={logo} />
          <img className="sidebar-logo-text" src={logoText} />
        </div>
        <div className="sidebar-line"></div>
        {song.tracks.map((trackObj) => {
          return (
            <Track
              key={trackObj._id.toString()}
              id={trackObj._id.toString()}
              highlight={selected === trackObj._id.toString()}
              name={trackObj.name}
              type={trackObj.type}
              clickFunction={setSelected}
              setShowPicker = {setShowPicker}
              notes={trackObj.notes}
              creator_name={song.creator_name}
              creator_id={song.creator_id}
            />
          );
        })}
        <NewTrack addNewTrack={addNewTrack} setShowPicker={setShowPicker} />
      </div>
    </>
  );
};

export default SideBar;
