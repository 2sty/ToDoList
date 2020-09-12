const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy cake", "Cook cake", "Eat cake"];
const workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){
  //res.send("Hello!");
  const day = date.getDate();
  res.render('list', {listTitle: day, newListItems: items});

});
app.post("/", function(req,res){
  console.log(req.body);
  const item = req.body.newItem;
  if(req.body.list === "Work list"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req,res){
  res.render('list', {listTitle: "Work list", newListItems: workItems});
});
app.post("/work", function(req,res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
app.listen(3000, function(){
  console.log("Starting on port 3000!");
})
