const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  color: String,
  start: Number,
  end: Number,
  notes: [],
});

const SongSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  name: String,
  code: String,
  tracks: [TrackSchema]
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);