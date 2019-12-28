const mongoose = require("mongoose");
// const mongojs = require("mongojs");

const schema = new mongoose.Schema({ 
  title: 'string', 
  link: 'string',
  description: 'string', 
  image: 'string'
});
const Article = mongoose.model('Article', schema);


module.exports = Article;