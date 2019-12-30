// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require models
const db = require("./models");

// If deployed, use the deployed DB, otherwise use the local mongoHeadlines DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

const port = process.env.PORT || 3000;

// Initialize express
const app = express();

// Configure Middleware
// Use morgan HTTP request logger
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, function(error) {
  if(error) { 
    throw error
  } 
  console.log("Successful Connection!");
});

// Routes
require("./routes/apiRoutes")(app);
// require("./routes/userRoutes")(app);
// require("./routes/notesRoutes")(app);
// require("./routes/submitRoutes")(app);

// Start the server
app.listen(port, function() {
  console.log("Listening on PORT: " + port
  );
});