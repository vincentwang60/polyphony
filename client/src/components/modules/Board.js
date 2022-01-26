import { get } from "../../utilities.js";
import React, { useState, useEffect } from "react";

import "./Board.css";
import BoardTrack from "./BoardTrack.js"

const Board = (props) => {
  const [song, setSong] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    console.log('board received',props.songId)
    if(props.songId != undefined && props.songId != ''){
      console.log('board received',props.songId)
      get('/api/song',{songId:props.songId}).then((song)=>{
        console.log('found song', song)
        setSong(song)
      })
    }
  },[props.songId])

  useEffect(()=>{
    if(song != undefined){
      setLoading(false)
    }
  },[song])

  if(loading){
    return (
      <div>Loading</div>
    )
  }
  return (
    <>
      <div className={"board-container" + (props.showPicker ? "" : "-full")}>
        {song.tracks.map((track)=>{
          return (
            <BoardTrack />
          )
        })}
      </div>
    </>
  );
};
//
export default Board;
