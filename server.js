const express = require("express");
const path = require("path");
const app = express();

const userRouter = require("./routes/users.js");
const datasRouter = require("./routes/datas.js");
const sendRouter = require("./routes/send.js");
const uploadRouter = require("./routes/uploads.js");

//? FOR RES RENDER FUNCTION: to set an engine
app.set("view engine", "ejs");

//? USE STATIC FOR RENDER CLIENT SIDE
//* will read all the file inside public on the client side
//* So you can create route, page
//* and link css, js, image....
//* use route "/" pour lire les fichiers dans public
//* use route "/uploads" pour lire les fichiers dans uploads
app.use("/", express.static(path.resolve(__dirname, "public")));
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

//? ACCESS TO POST DATAS: set globally or inside route
//* to get access to the body from form submit
/* app.use(express.urlencoded({ extended: true })); */
//* to get access to the body from JSON
app.use(express.json());

//? USE ROUTER FOR API, SEND JSON
app.use((req, res, next) => {
  //! use "Content-Type", "application/json", to send data
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  //! set header allow above in Access-Control-Allow-Headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Authorization, Origin, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use("/api/users", userRouter);
app.use("/api/datas", datasRouter);
app.use("/api/uploads", uploadRouter);

//? USE ROUTE FOR RENDER HTML using views (server side)
app.use("/fromServer", sendRouter); //Using static instead

//? LISTEN TO
app.listen(8000, () => {
  console.log("Running on 8000");
});
