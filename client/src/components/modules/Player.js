import React, { useState, useEffect } from "react";

import "./Player.css";
import NotePicker from "./NotePicker.js";
import TopBar from "./TopBar.js";
import Board from "./Board.js";

import {
  A0, A1, A2, A3, A4, A5, A6, A7, Ab1, Ab2, Ab3, Ab4, Ab5, Ab6, Ab7, B0, B1, B2, B3, B4, B5, B6, B7, Bb0, Bb1, Bb2, Bb3, Bb4, Bb5, Bb6, Bb7, C1, C2, C3, C4, C5, C6, C7, D1, D2, D3, D4, D5, D6, D7, Db1, Db2, Db3, Db4, Db5, Db6, Db7, E1, E2, E3, E4, E5, E6, E7, Eb1, Eb2, Eb3, Eb4, Eb5, Eb6, Eb7, F1, F2, F3, F4, F5, F6, F7, G1, G2, G3, G4, G5, G6, G7, Gb1, Gb2, Gb3, Gb4, Gb5, Gb6, Gb7
} from "../../public/notes/index.js";

const Player = (props) => {
  const [playerTime, setPlayerTime] = useState(0);
  const [play, setPlay] = useState(false);
  const [playing, setPlaying] = useState([]);
  const dictS = {
    'A0': A0, 'A1': A1, 'A2': A2, 'A3': A3, 'A4': A4, 'A5': A5, 'A6': A6, 'A7': A7,
    'Ab1': Ab1, 'Ab2': Ab2, 'Ab3': Ab3, 'Ab4': Ab4, 'Ab5': Ab5, 'Ab6': Ab6, 'Ab7': Ab7,
    'B0': B0, 'B1': B1, 'B2': B2, 'B3': B3, 'B4': B4, 'B5': B5, 'B6': B6, 'B7': B7,
    'Bb0': Bb0, 'Bb1': Bb1, 'Bb2': Bb2, 'Bb3': Bb3, 'Bb4': Bb4, 'Bb5': Bb5, 'Bb6': Bb6, 'Bb7': Bb7, 
    'C1': C1, 'C2': C2, 'C3': C3, 'C4': C4, 'C5': C5, 'C6': C6, 'C7': C7, 
    'D1': D1, 'D2': D2, 'D3': D3, 'D4': D4, 'D5': D5, 'D6': D6, 'D7': D7, 
    'Db1': Db1, 'Db2': Db2, 'Db3': Db3, 'Db4': Db4, 'Db5': Db5, 'Db6': Db6, 'Db7': Db7, 
    'E1': E1, 'E2': E2, 'E3': E3, 'E4': E4, 'E5': E5, 'E6': E6, 'E7': E7, 
    'Eb1': Eb1, 'Eb2': Eb2, 'Eb3': Eb3, 'Eb4': Eb4, 'Eb5': Eb5, 'Eb6': Eb6, 'Eb7': Eb7, 
    'F1': F1, 'F2': F2, 'F3': F3, 'F4': F4, 'F5': F5, 'F6': F6, 'F7': F7, 
    'G1': G1, 'G2': G2, 'G3': G3, 'G4': G4, 'G5': G5, 'G6': G6, 'G7': G7, 
    'Gb1': Gb1, 'Gb2': Gb2, 'Gb3': Gb3, 'Gb4': Gb4, 'Gb5': Gb5, 'Gb6': Gb6, 'Gb7': Gb7 }
    

  useEffect(() => {
    if (play) {
      const i = setInterval(() => {
        setPlayerTime((oldPlayerTime) => oldPlayerTime + 0.1);
      }, 40);
      return () => {
        clearInterval(i);
      };
    }
    else {
      setPlaying([])
    }
  }, [play]);

  useEffect(() => {
    if (playerTime > 79) {
      setPlay(false);
    }
    if ((3 * playerTime) % 1 < 0.1) {
      getNotes();
    }
  }, [playerTime]);

  const numToNote = (num) => {
    let map = { 0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E', 5: 'F', 6: 'Gb', 7: 'G', 8: 'Ab', 9: 'A', 10: 'Bb', 11: 'B' }
    console.log('got:',num,'returning',map[(num - 3) % 12] + Math.floor((num + 9) / 12).toString())
    return map[(num - 3) % 12] + Math.floor((num + 9) / 12).toString()
  }

  const playNote = (note) => {
    const audio = new Audio(note);
    audio.play();
  };

  const notePicked = (note) => {
    playNote(dictS[numToNote(note)])
  }

  const inPlaying = (note) => {
    for (let k = 0; k < playing.length; k++) {
      if (note[0] == playing[k][0] && note[1] == playing[k][1]) {
        return true;
      }
    }
    return false;
  };

  const getNotes = () => {
    let tracks = props.song.tracks;
    for (let i = 0; i < tracks.length; i++) {
      for (let j = 0; j < tracks[i].notes.length; j++) {
        let n = [tracks[i].notes[j][0] + tracks[i].start, tracks[i].notes[j][1]];
        if (n[0] <= (playerTime * 4) / 5 && n[0] + 2 >= (playerTime * 4) / 5) {
          if (!inPlaying(n)) {
            setPlaying((playing) => [...playing, n]);
            playNote(dictS[numToNote(n[1])])
          }
        }
      }
    }
  };

  return (
    <>
      <div className="player-container u-flex">
        <div className="player-leftLine" />
        <div className="player-containerH u-flexColumn">
          <TopBar setPlaying={setPlaying} setPlayerTime={setPlayerTime} play={play} setPlay={setPlay} playerTime={playerTime - 0.4} />
          <Board
            setSong={props.setSong}
            song={props.song}
            showPicker={props.showPicker}
            setSelected={props.setSelected}
            setShowPicker={props.setShowPicker}
            songId={props.song._id}
            playerTime={playerTime}
          />
          <NotePicker
            user={props.user}
            song={props.song}
            selected={props.selected}
            showPicker={props.showPicker}
            setShowPicker={props.setShowPicker}
            notePicked={notePicked}
          />
        </div>
      </div>
    </>
  );
};

export default Player;
