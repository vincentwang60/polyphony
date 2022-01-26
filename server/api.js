/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const mongoose = require("mongoose");

// import models so we can interact with the database
const User = require("./models/user");
const Song = require("./models/song");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/song", (req, res) => {
  Song.findById(req.query.songId).then((info) => res.send(info));
});

router.get("/songByCreator", (req, res) => {
  Song.find({ creator_id: req.query.creator_id }).then((song) => {
    res.send(song);
  });
});

router.get("/track", (req, res) => {
  Song.findById(req.query._id).then((song) => {
    var out = song.tracks.filter(function (el) {
      return el._id == req.query.trackId;
    });
    res.send(out);
  });
});

router.post("/updatetrack", (req, res) => {
  let inTrack = false;
  Song.findById(req.body._id).then((song) => {
    track = song.tracks.id(req.body.trackId);
    for (let i = 0; i < track.notes.length; i++) {
      if (req.body.notes[0] == track.notes[i][0] && req.body.notes[1] == track.notes[i][1]) {
        track.notes.splice(i, 1);
        inTrack = true;
      }
    }
    if (!inTrack) {
      track.notes.push(req.body.notes);
    }
    song.save();
    socketManager.getIo().emit(song.code,song);
  }); 
});

router.post("/updatesong", (req, res) => {
  Song.findOneAndUpdate(
    { creator_id: req.body.creator_id },
    { tracks: req.body.tracks },
    { new: true }
  ).then((song)=>{
    song.save();
    socketManager.getIo().emit(song.code,song);
    res.send(song)
  })
});

router.post("/song", (req, res) => {
  const newSong = new Song({
    creator_id: req.user._id,
    creator_name: req.user.name,
    name: req.body.name,
    code: req.body.code,
    tracks: req.body.tracks,
  });
  newSong.save().then((song) => res.send(song));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
