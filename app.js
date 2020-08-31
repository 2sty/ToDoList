const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy cake", "Cook cake", "Eat cake"];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){
  //res.send("Hello!");
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render('list', {kindOfDay: day, newListItems: items});

});
app.post("/", function(req,res){
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});
app.listen(3000, function(){
  console.log("Starting on port 3000!");
})
