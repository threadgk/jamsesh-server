const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require("fs"); 

app.use(cors());
app.use(express.static("public"));

// load json data
const artists = require("./data/artists.json");
const genres = require("./data/genres.json");
const trending = require("./data/charts.json");
const profiles = require("./data/users.json");

// serve index.html 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// api endpoints
app.get("/api/artists", (req, res) => res.json(artists));
app.get("/api/genres", (req, res) => res.json(genres));
app.get("/api/trending", (req, res) => res.json(trending));
app.get("/api/profiles", (req, res) => res.json(profiles)); 

app.get("/api/profiles/:username", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const user = data.find(u => u._username === req.params.username);

  if (user) res.json(user);
  else res.status(404).json({error: "User not found"}); 
  } catch (error) { 
    console.error("Error reading user data:", error);
    res.status(500).json({error: "Internal server error"});
  }
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

