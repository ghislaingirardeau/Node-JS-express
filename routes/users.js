const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/new", express.urlencoded({ extended: true }), (req, res) => {
  let token = jwt.sign(req.body, process.env.TOKENSECRET, { expiresIn: "3h" });

  const response = {
    ...req.body,
    token,
  };
  res.status(201);
  //* je redirige vers la route qui renvoie le html
  //* les info de user, sont alors dans le token
  res.redirect(
    `${req.protocol}://${req.get("host")}/fromServer/${response.name}?token=${
      response.token
    }`
  );
});



router.get("/:id", (req, res) => {
  res.status(200);
  res.send(req.userDetail);
});

//* middleware on the route with a specific id
router.param("id", (req, res, next, id) => {
  //? Middleware authentification with a req headers
  //let token = req.headers.authorization.replace("Bearer ", "");
  //? Middleware with a redirect
  try {
    //* decode le token et si ok next()
    let decoded = jwt.verify(req.query.token, process.env.TOKENSECRET);
    req.userDetail = decoded;
    next();
  } catch (error) {
    res.status(500);
    res.send({ message: "You are not authentified" });
  }
});

module.exports = router;
