require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
global.axios = axios;
const router = require("./routes/controller");
const {
  signUp,
  loggingIn,
  verifyUser,
  isValid,
  logout,
} = require("./auth/auth");

app.options("*", cors());

// all environments

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/crud", router);

app.get("/", (req, res) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    res.render("login");
    return;
  }
  res.redirect("/crud");
});
app.post("/login", loggingIn, async (req, res) => {
  res.redirect("/crud");
});
app.post("/signUp", signUp, (req, res) => {
  res.send("User Created.Back to login");
});

app.get("/logout", logout);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
