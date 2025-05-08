var express = require("express");
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require ('morgan');
var cors = require("cors");
var bodyParser = require("body-parser");
 const multer = require("multer");

 

const index = require("./routes/index");
var app = express();
const router = express.Router();


const uri = process.env.MONGO_URI || "mongodb://localhost:27017/db_transco";
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  var sess = {
    secret: "keyboard cat",
    cookie: {},
    saveUninitialized: true,
    resave: true,
  };
  app.use(cors(corsOptions));
  app.use(session(sess));


  app.use(bodyParser.json({ limit: '100550mb' }));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
  });




  app.use(index);
  mongoose
  .connect(uri)
  .then((result) => {
    app.listen(process.env.PORT || 3500, () => {
      console.log("------- Server lancé ------ ");
    });
    // var socketIo = socket(server);
    // socketIo.on('connection', (socket) => {
    //   console.log("Socket IO ", socket.id)
    // });
    //console.log(req.user);
  })
  .catch((err) => {
    console.log(err);
  });
