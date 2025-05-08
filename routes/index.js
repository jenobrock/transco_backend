var express = require("express");
var app = express();
var route_users = require("./routes");
app.use("/api", route_config);

module.exports = app;
