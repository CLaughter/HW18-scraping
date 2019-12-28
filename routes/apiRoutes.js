var axios = require('axios');
var cheerio = require('cheerio');
var Article = require('../models/Articles');
const path = require("path");

module.exports = function(app) {
  app.get("/Articles", function(req, res) {
    console.log("Request made");
    axios.get('https://www.nytimes.com/section/technology')
    .then(function(response) {
      var $ = cheerio.load(response.data)
      $(".css-ye6x8s").each(function(i, element) {
        console.log(element);
      })
    });
  });
  app.get("/api/news", function(req, res) {
    console.log("GET API NEWS")
    db.news.findAll({}).then(function(assets) {
      res.json(assets);
    });
  });
};
