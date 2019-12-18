var mongoose = require("mongoose");

var schema = new mongoose.Schema({ 
  title: 'string', 
  link: 'string',
  description: 'string', 
  image: 'string'
});
var Article = mongoose.model('Article', schema);


module.exports = Article;