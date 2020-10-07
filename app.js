const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require(__dirname + "/config.js");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://" + config.getConfig().username + ":" + config.getConfig().password + config.getConfig().db, {
  useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);
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

const listSchema = new mongoose.Schema({
  name: String,
  items:[itemsSchema]
});

const List = mongoose.model("List", listSchema);

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
app.get("/:customList", function(req,res){
  const customList = _.capitalize(req.params.customList);
  if(customList != "Favicon.ico"){
    List.findOne({name:customList}, function(err,foundList){
      if(!err){
        if(!foundList){
          //Create a new list
          const list = new List({
              name: customList,
              items: defaultItems
          });
          list.save();
          res.redirect("/" + customList);
        }else{
          //Show an existing list
          res.render("list", {
            listTitle: foundList.name,
            newListItems: foundList.items
          })
        }
      }
    });
  }
});

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function(err){
      if(!err){
        console.log("Item has been removed.");
        res.redirect("/");
      }
    })
  }else{
    List.findOneAndUpdate({name:listName}, {$pull:{items:{_id:checkedItemId}}}, function(err,foundList){
      res.redirect("/" + listName);
    })
  }


})
app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

    const item = new Item({
      name: itemName
    });

    if(listName === "Today"){
      item.save();
      res.redirect("/");
    }else{
      List.findOne({name:listName}, function(err, foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      })
    }


});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has started!");
})
