const express = require("express");
const router = express.Router();
const app = express();
const uploadsFile = require("../middlewares/multer.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.set("view engine", "ejs");

const encode = app.use((req, res, next) => {
  //! use "Content-Type", "text/html", si je veux render Views
  res.setHeader("Content-Type", "text/html");
  next();
});

let users = [];

router
  .route("/")
  .post(uploadsFile, (req, res) => {
    //! POST des form-data via la page static du site
    const datas = {
      ...req.body,
      filename: req.file.filename, // or file : acces aux fichiers
    };
    let token = jwt.sign(datas, process.env.TOKENSECRET);
    users.push(datas);
    res.redirect(`?avatar=${req.file.filename}`);
  })
  .get(encode, (req, res) => {
    //! REDIRECT vers une page render du serveur, avec l'image uploader en params
    res.render("user", {
      textFromServer: users[0].name,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${
        req.query.avatar
      }`,
    });
    res.status(200);
  });

module.exports = router;
