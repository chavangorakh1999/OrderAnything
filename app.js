require("dotenv").config();
const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

const mongoose = require("mongoose");

mongoose.connect(process.env.__MONGO_URI__, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});


app.post("/register", async (req, res) => {
  try {
    let foundUser = User.findOne({ email: req.body.email });
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        id: Date.now(),
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      });
      newUser.save().then(() => {
        res.status(201).send("Wish Saved to Wishlist!");
      });
      console.log("User list", User);

      res.send(
        "<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>"
      );
    } else {
      res.send(
        "<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>"
      );
    }
  } catch {
    res.send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const foundUser =await User.findOne({ email: req.body.email });
    console.log(foundUser);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        let usrname = foundUser.username;
        res.send(
          `<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`
        );
      } else {
        res.send(
          "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>"
        );
      }
    } else {
      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
      await bcrypt.compare(req.body.password, fakePass);

      res.send(
        "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>"
      );
    }
  } catch {
    res.send("Internal server error11");
  }
});

server.listen(3000, function () {
  console.log("server is listening on port: 3000");
});
