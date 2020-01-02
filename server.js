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

// If deployed, use the deployed DB, otherwise use the local mongoHeadlines DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.set('useUnifiedTopology', true);
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, function(error) {
  if(error) { 
    throw error
  } 
  console.log("Successful Connection!");
});

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// A GET route for scraping the website
  // app.get("/articles", function(req, res) {
    // Grab the body of the html with axios
    axios.get("https://www.nytimes.com/section/technology")
    .then(function(response) {      
    // and load that into cheerio
      const $ = cheerio.load(response.data)
      // Grab and loop through <li> class name
      $(".css-ye6x8s").each(function(i, element) {
        // Empty result object
        // const result = {};

        // // Add the data and save them as properties of the result object
        // result.title = $(this)
        //   .find("h2")
        //   .text();
        // result.link = $(this)
        //   .find("a")
        //   .attr("href");
        // result.description = $(this)
        //   .find("p")
        //   .text();
          
        // Grab all h2 headline text
        const title = $(element).find("h2").text();
        console.log(title);
        // Grab the associated link
        const link = $(element).find("a").attr("href");
        console.log(link);
        // Grab article body text
        const description = $(element).find("p").text();
        console.log(description);

        // Create a new Article using the `result` object built from scraping
        // db.scraper.create(result)
        //   .then(function(dbScrape) {
        //     // View the added result in the console
        //     console.log(dbScrape);
        //   })
        //   .catch(function(err) {
        //     console.log(err);
        //   });
      });

      // Send a message to the client
      console.log("*********************");
      console.log("**** scrape done ****");
      console.log("*********************")
      // res.send("Scrape Complete");
    });
  // });
  // Route for getting all Articles from the db
  // app.get("/articles", function(req, res) {
  //   // Grab every document in the Articles collection
  //   db.scraper.find({})
  //     .then(function(dbScrape) {
  //       // If we were able to successfully find Articles, send them back to the client
  //       res.json(dbScrape);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

//   // Route for grabbing a specific Article by id, populate it with it's note
//   app.get("/articles/:id", function(req, res) {
//   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.scraper.findOne({ _id: req.params.id })
//       // ..and populate all of the notes associated with it
//       .populate("note")
//       .then(function(dbScrape) {
//         // If we were able to successfully find an Article with the given id, send it back to the client
//         res.json(dbScrape);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

//   // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.scraper.findOneAndUpdate(
//         { _id: req.params.id }, 
//         { note: dbNote._id }, 
//         { new: true }
//       );
//     })
//     .then(function(dbScrape) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbScrape);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// Start the server
app.listen(port, function() {
  console.log("Listening on PORT: " + port
  );
});