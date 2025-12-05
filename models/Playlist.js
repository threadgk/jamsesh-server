const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, default: "" },
    // picture field required by assignment (can be a URL or filename)
    image: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", PlaylistSchema);