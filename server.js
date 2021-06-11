const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash")
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

app.use('/public', express.static("public"));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use('/views', express.static("views"));

mongoose.connect('mongodb+srv://admin:admin@cluster0.stzed.mongodb.net/placesDB?retryWrites=true&w=majority');

app.get("/home", function(req, res) {
  res.render("home");
});

app.get("/account", function(req, res) {
  res.render("account");
});

app.get("/password", function(req, res) {
  res.render("password");
  });

app.get("/delete", function(req, res) {
  res.render("delete");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/about-us", function(req, res){
  res.render("about-us");
});

const messagesSchema = {
  name: String,
  email: String,
  message: String
}

const Message = mongoose.model('Message', messagesSchema);

app.get('/public/contacts.html', function(req, res) {
  res.sendFile(__dirname +'/contacts.html')
})

app.post("/public/contacts.html", function(req, res) {
  let newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
  })
  newMessage.save();
  res.redirect('/public/contacts.html');
})

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const itemOne = new Item({
  name: "Nur-Sultan"
});
const itemTwo = new Item({
  name: "Almaty"
});
const itemThree = new Item({
  name: "Turkistan"
})

const defaultItems = [itemOne, itemTwo, itemThree];

const listSchema = {
  name: String,
  listItems: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/places", function(req, res) {

// const day = date.getDate();
  Item.find({}, function(err, foundItems) {
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("all done");
        }
      });
      res.redirect("/places");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems, date: date.getDate()});
    }
  })
});

app.post("/places", function(req, res){

  const newItem = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: newItem
  });

  if(listName === "Today") {
    item.save();
    res.redirect("/places")
  } else {
    List.findOne({name: listName}, function(err, foundList) {
      foundList.listItems.push(item),
      foundList.save();
      res.redirect("/places" + listName)
    })
  }
});

app.post("/deleted", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const customListName = req.body.customListName;

  if(customListName === "Today") {
    Item.findByIdAndDelete({_id: checkedItemId}, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("all done");
        res.redirect("/places")
      }
    })
  } else {
    List.findOneAndUpdate({name: customListName}, {$pull: {listItems: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err) {
        res.redirect("/places" + customListName);
      }
    })
  }
})

app.get("/places:newList", function(req, res) {
  const newList = _.capitalize(req.params.newList);

  List.findOne({name: newList}, function(err, foundList) {
    if(!err) {
      if(!foundList) {
        const list = new List({
          name: newList,
          listItems: defaultItems
        });
        list.save();
        res.redirect("/places" + newList)
      } else {
          res.render("list", {
            listTitle: foundList.name,
            newListItems: foundList.listItems,
            date: date.getDate()
          })
        }
      }
    })
})

const placesSchema = {
  title: String,
  type: String,
  region: String,
  climate: String
}

const Place = mongoose.model('Place', placesSchema);

app.get('/public/filter.html', (req, res) => {
  Place.find({}, function(err, places) {
      res.render('index', {
          placesList: places
      })
  })
})

const adminsSchema = {
    title: String,
    telegram: String,
    instagram: String
}

const Admin = mongoose.model('Admin', adminsSchema);

app.get('/about-us', (req, res) => {
    Admin.findOne({title: "Yerkegul Assaiyn"}, function(err, admins) {
        res.render('about-us', {
            adminsList: admins
        })
    })
})

// mongoClient.connect(function(err, client){
      
//   const db = client.db("placesdb");
//   const collection = db.collection("admins");

//   if(err) return console.log(err);
    
//   collection.find({title: "Yerkegul Assaiyn"}).toArray(function(err, admins){
               
//       console.log(admins);
//       client.close();
//   });
// })

const userSchema= {
  email: String,
  Username: String,
  password: String,
}
const User = new mongoose.model("User", userSchema);

app.post("/register", function(req,res){
  const newUser = new User({
  email: req.body.email,
  Username: req.body.Username,
  password: req.body.password
});
newUser.save(function(err){
  if(err) { console.log(err); }
  else{ 
    console.log("New User");
    res.render("home"); }
});
res.redirect('/');
});

app.post("/account", function(req, res){
  const username = req.body.Username;
  const password = req.body.password;
  User.findOne({Username: req.body.Username}, function(err, foundUser){
    if(err) { console.log(err);}
    else {
      if (foundUser) {
        if (foundUser.password === req.body.password) {
          console.log("User successfully entered!");
        }
      }
    }
  });
});

app.post('/password', function(req, res) {

  User.findOneAndUpdate(req.body.username,
    { $set: {password: req.body.password}},
    function(err, result) {
      // console.log(result);
      console.log("Data updated!");
    });  
});

app.post('/delete', function(req, res) {
  User.deleteOne(req.body.username, function(err, result){
    console.log("Data removed!");
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
})
