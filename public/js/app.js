$.getJSON("/mongoHeadlines", function(data) {
  console.log(data);
  for(var i = 0; i = data.length; i++) {
    $("#results").append("<li>" + data[i] + "</li>");
  }
});