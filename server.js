const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require("fs");   
const multer = require("multer");




app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");

  }, 

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-"+ file.originalname); 
  }
}); 

const upload = multer ({ storage}); 

// load json data
const artists = require("./data/artists.json");
const genres = require("./data/genres.json");
const trending = require("./data/charts.json");

// upload avatar
app.post("/api/upload/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file Uploaded"}); 
  res.json({ filePath: `/uploads/${req.file.filename}`}); 

}); 

// upload banner 
app.post("/api/upload/banner", upload.single("banner"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded"});  
  res.json({ filePath: `/uploads/${req.file.filename}`});

})


// create new user 
app.post("/api/signup", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8")) 
    const { username, password, name, dob }  = req.body;

    if (users.find(u => u._username === username)){
      return res.status(400).json({error: "Username already exists"});
    }

    const newUser = {
      _username: username, 
      _password: password, 
      name: name,
      dob: dob,
      avatar: "",
      banner: "",
      bio: "",
      location: ""
    };

    users.push(newUser); 
    fs.writeFileSync("./data/users.json", JSON.stringify(users,null,2));

    res.json({ message: "User created", user: newUser}); 

  } catch (err) {
    console.error("Signup Error:", err); 
    res.status(500).json({ error: "Internal server error"});
  }
});

// validate credentials 
app.post("/api/login", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const { username, password } = req.body;

    const found = users.find(
      u => u._username === username && u._password === password
    );

    if (!found) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user: found });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}); 

app.put("/api/profile/update", (req, res) => {
  try {
    const { username, avatar, banner, bio, location } = req.body; 

    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8")); 
    const index = users.findIndex(u => u._username === username);

    if (index === -1) {
      return res.status(404).json({error: "User Not Found" });
    } 

    users[index].avatar = avatar;
    users[index].banner = banner;
    users[index].bio = bio;
    users[index].location = location; 

    
    fs.writeFileSync("./data/users.json", JSON.stringify(users,null,2) ); 

    res.json({ message: "Profile udpdate", user: users[index] }) ; 
    
  }catch (err) {
      console.error("Update error:", err); 
      res.status(500).json({ error: "Internal server error"});
    }
});

// serve index.html 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// api endpoints
app.get("/api/artists", (req, res) => res.json(artists));
app.get("/api/genres", (req, res) => res.json(genres));
app.get("/api/trending", (req, res) => res.json(trending));

app.get("/api/profiles", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    res.json(users);
  } catch (error) { 
    console.error("Error reading user data:", error);
    res.status(500).json({error: "Internal server error"});
  }
}); 

app.get("/api/profiles/:username", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8")); 
    const user = users.find(u => u._username === req.params.username); 

    if (user) res.json(user); 
    else res.status(404).json({ error: "User not found"});

  } catch (error) {
    console.error(" Error reading the user data", error); 
    res.status(500).json({ error: "Internal server error"}); 
  }
});

app.use("/uploads", express.static("uploads")); 

app.get("/api/avatars", (req, res) => {
  try {
    const avatarDir = path.join(__dirname, "uploads/avatar"); 
    const files = fs.readdirSync(avatarDir); 
    res.json(files.map(file => `/uploads/avatars/${file}`));  

  } catch (err) { 
    console.error("Avatar fetch error", err); 
    res.status(500).json({ error: "Error loading avatars"}); 

  }
});

app.get("/api/banners", (req, res) => {
  try {
    const bannerDir = path.join(__dirname, "uploads/banners"); 
    const files = fs.readdirSync(bannerDir); 
    res.json(files.map(file => `/uploads/banners/${file}`));  

  } catch (err) { 
    console.error("Banner fetch error", err); 
    res.status(500).json({ error: "Error loading banners"}); 

  }
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

