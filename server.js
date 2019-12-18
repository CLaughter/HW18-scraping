// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var logger = require("morgan");

// axios("https://makeawebsitehub.com/examples-of-blogs/", (error, response, html) =>{
//   if(!error && response.statusCode == 200) {
//     console.log("html");
//   }
// });
// Require models
var models = require("./models");

// Initialize express
var app = express();

// If deployed, use the deployed DB, otherwise use the local mongoHeadlines DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Hook mongoose configuration to the db variable
var db = mongoose.connect(MONGODB_URI, function(error) {
  if(error) { 
    throw error
  } 
  console.log("Successful Connection!");
});

var port = process.env.PORT || 3000;

// Configure Middleware
// Use morgan HTTP request logger
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);


app.listen(port, function() {
  console.log("Listening on PORT: " + port
  );
});

module.exports = app;