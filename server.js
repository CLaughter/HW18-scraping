// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const axios = require('axios');
const cheerio = require('cheerio');

// Require models
const db = require("./models");

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

// If deployed, use the deployed DB, otherwise use the local dbScrape DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dbScrape";
mongoose.set('useUnifiedTopology', true);
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (error) {
  if (error) {
    throw error
  }
  console.log("Successful connection to mongoDB!");
});

// Get the default connection
// let dbConnect = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("mongoose IS connected");
// });

// A GET route for scraping the website
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Grab the body of the html with axios
axios.get("https://www.nytimes.com/section/technology")
  .then(function (response) {
    // and load that into cheerio
    let $ = cheerio.load(response.data)


    // Grab and loop through <li> class name
    $(".css-ye6x8s").each(function (i, element) {

      // let result = {};
      const title = $(element).text();
      const link = $(element).find("a").attr("href");
      const description = $(element).find("p").text();


      // Save these results in an object that we'll push into the results array we defined earlier

      const result = {
        title,
        link: "https://www.nytimes.com" + link,
        description
      }

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
    console.log(result);

    // Send a message to the client
    console.log("*********************");
    console.log("**** scrape done ****");
    console.log("*********************");
    // res.send("Scrape Complete");
  });

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  console.log("yo");
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.dbScraper.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(port, function () {
  console.log("Listening on PORT: " + port);
});