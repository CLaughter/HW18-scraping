var axios = require('axios');
var cheerio = require('cheerio');
var Article = require('../models/Articles');

module.exports = function(app) {
  app.get("/", function(req, res) {
    axios.get('https://www.nytimes.com/section/technology')
    .then(function(data) {
      var $ = cheerio.load(data)
      
    });
  });
  app.get("/api/news", function(req, res) {
    console.log("GET API NEWS")
    db.news.findAll({}).then(function(assets) {
      res.json(assets);
    });
  });
};
