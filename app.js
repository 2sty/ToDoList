const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true, useUnifiedTopology: true
});

const itemsSchema = new mongoose.Schema({
  name:String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete item."
});

const defaultItems = [item1,item2,item3]

Item.find({}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log();
  }
});

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    if(err){
      console.log(err);
    }else{
      if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
          if(err){
            console.log(err);
          }else{
            console.log("Everything is okay!");
          }
        })
        res.redirect("/");
      }
      else{
        res.render('list', {
          listTitle: "Today",
          newListItems: foundItems
        });
      }
    }
  });

});
app.post("/", function(req, res) {
  const itemName = req.body.newItem;
    const item = new Item({
      name: itemName
    });
    item.save();
    res.redirect("/");
});
app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work list",
    newListItems: workItems
  });
});
app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
app.listen(3000, function() {
  console.log("Starting on port 3000!");
})
