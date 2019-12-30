var axios = require('axios');
var cheerio = require('cheerio');
var Article = require('../models/Article');
const path = require("path");

module.exports = function(app) {
  app.get("/Articles", function(req, res) {
    console.log("Request made");
    axios.get('https://www.nytimes.com/section/technology')
    .then(function(response) {
      const $ = cheerio.load(response.data)

      const results = [];

      $(".css-ye6x8s").each(function(i, element) {
        const title = $(element).find("h2").text();
        console.log(title);
        const link = $(element).children().attr("href");
        console.log(link);
        const description = $(element).find("p").text();
        console.log(description);
        const image = $(element).find("img").attr("src");
        console.log(image);

        // const article = { title, link, description, image };
      //   results.push({
      //     title: title,
      //     link: link,
      //     description: description,
      //     image: image
      // })        

        // Article.findOneAndUpdate({title}, article, {upsert: true, new: true}, function(error, result) {
        //   console.log(result);
        //   if(error) {
        //     console.log("Not updated: ", error);
        //     res.send(error);
        //   } else {
        //     results.push(result);
        //   }
        // });
      })
      // Article.create()
      console.log(results);
      // res.send(results);
    });
  });
};