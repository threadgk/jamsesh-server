const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static("public"));

// load json data
const artists = require("./data/artists.json");
const genres = require("./data/genres.json");
const trending = require("./data/trending.json");
const profiles = require("./data/profiles.json");

// serve index.html (optional for Render root)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// api endpoints
app.get("/api/artists", (req, res) => res.json(artists));
app.get("/api/genres", (req, res) => res.json(genres));
app.get("/api/trending", (req, res) => res.json(trending));
app.get("/api/profiles", (req, res) => res.json(profiles));

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

