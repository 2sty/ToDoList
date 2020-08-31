const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req,res){
  //res.send("Hello!");
  var today = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var day = "";
  var today = today.getDay();
  day = days[today];
  res.render('list', {kindOfDay: day});

});

app.listen(3000, function(){
  console.log("Starting on port 3000!");
})
