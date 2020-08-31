const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req,res){
  //res.send("Hello!");
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render('list', {kindOfDay: day});

});

app.listen(3000, function(){
  console.log("Starting on port 3000!");
})
