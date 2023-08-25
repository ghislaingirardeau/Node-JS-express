const express = require("express");
const router = express.Router();
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.set("view engine", "ejs");
const htmlContent = app.use((req, res, next) => {
  //! use "Content-Type", "text/html", si je veux render Views
  res.setHeader("Content-Type", "text/html");
  next();
});

//? RES SEND TYPES

router.get("/", htmlContent, (req, res) => {
  res.status(200);
  //* res.json({ message: "Hello" });
  res.render("index", {
    textFromServer: "from server",
    title: "New User",
  });
  //* res.sendFile(path.resolve(__dirname, "views", "index.html")); /* will send a file ex: html */
  //* res.send() for test purpose
  //* res.download(text.txt) on browser, will popup the dir to download the following file
});

router.get("/about", htmlContent, (req, res) => {
  res.status(200);
  res.render("about");
});

router.get("/:newUser", htmlContent, (req, res) => {
  res.status(200);
  const { name, email } = req.userDetail;
  console.log(req.userDetail);
  res.render("newUser", {
    title: "User",
    name,
    email,
  });
});

//* middleware on the route with a specific id
router.param("newUser", (req, res, next, id) => {
  try {
    //* decode le token et si ok next()
    let decoded = jwt.verify(req.query.token, process.env.TOKENSECRET);
    delete decoded.iat;
    delete decoded.exp;
    delete decoded.password;
    console.log(decoded);
    req.userDetail = decoded;
    next();
  } catch (error) {
    res.status(500);
    res.send({ message: "You are not authentified" });
  }
});

module.exports = router;
