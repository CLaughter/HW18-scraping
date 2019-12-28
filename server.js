// Dependencies
const  express = require("express");
const  mongoose = require("mongoose");
const  axios = require("axios");
const  cheerio = require("cheerio");
const  logger = require("morgan");

// axios("https://makeawebsitehub.com/examples-of-blogs/", (error, response, html) =>{
//   if(!error && response.statusCode == 200) {
//     console.log("html");
//   }
// });
// Require models
const db = require("./models");

// Initialize express
const app = express();

// If deployed, use the deployed DB, otherwise use the local mongoHeadlines DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Hook mongoose configuration to the db variable
mongoose.connect(MONGODB_URI, function(error) {
  if(error) { 
    throw error
  } 
  console.log("Successful Connection!");
});

const  port = process.env.PORT || 3000;

// Configure Middleware
// Use morgan HTTP request logger
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
// db.User.create({ name: "Ernest Hemingway" })
//   .then(function(dbUser) {
//     console.log(dbUser);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });

// Routes
require("./routes/apiRoutes")(app);
// require("./routes/userRoutes")(app);
// require("./routes/notesRoutes")(app);
// require("./routes/submitRoutes")(app);

// The page's HTML is passed as the callback's third argument
// axios.get("https://nytimes.com/r/webdev/").then(function(response) {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   const $ = cheerio.load(response.data);

//   // An empty array to save the data that we'll scrape
//   const  results = [];

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   $("p.title").each(function(i, element) {

//     // Save the text of the element in a "title" variable
//     const title = $(element).text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     const link = $(element).children().attr("href");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });
//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });

//   $("figure.rollover").each(function(i, element) {

//     /* Cheerio's find method will "find" the first matching child element in a parent.
//      *    We start at the current element, then "find" its first child a-tag.
//      *    Then, we "find" the lone child img-tag in that a-tag.
//      *    Then, .attr grabs the imgs srcset value.
//      *    The srcset value is used instead of src in this case because of how they're displaying the images
//      *    Visit the website and inspect the DOM if there's any confusion
//     */
//     const imgLink = $(element).find("a").find("img").attr("data-srcset").split(",")[0].split(" ")[0];

//     // Push the image's URL (saved to the imgLink const ) into the results array
//     results.push({ link: imgLink });

//     console.log(results);
// });


app.listen(port, function() {
  console.log("Listening on PORT: " + port
  );
});