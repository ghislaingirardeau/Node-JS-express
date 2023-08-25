const express = require("express");
const router = express.Router();
const { allDatas } = require("../controllers/datas.js");

//* different way to write a route

router
  .route("/")
  .get(allDatas)
  .post((req, res) => {
    console.log(req.body.name);
    if (req.body.name) {
      res.status(200);
      res.json({
        message: `Got the name: ${req.body.name}`,
      });
    } else {
      res.status(400);
      /* res.redirect("/error"); */
    }
  });

//! example get query
router
  .route("/:dataId")
  .get((req, res) => {
    console.log(req.query);
    res.status(200);
    res.send("on the route GET data");
  })
  .put((req, res) => {
    res.status(200);
    res.send("on the route PUT data");
  })
  .delete((req, res) => {
    res.status(200);
    res.send("on the route DELETE data");
  });

module.exports = router;
