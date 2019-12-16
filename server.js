require("dotenv").config();

// If deployed, use the deployed DB, otherwise use the local mongoHeadlines DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Connect to the mongo DB
mongoose.connect(MONGODB_URI);

var express = require("express");
var app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on PORT: " + port
  );
});

module.exports = app;