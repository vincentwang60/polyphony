const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema({
  name: String,
  type: String,
  notes: Map,
});

const SongSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  name: String,
  tracks: [TrackSchema]
});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);