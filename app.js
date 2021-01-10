const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var items = [];
var workitems = [];

app.get('/', function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  const options = { weekday: 'long',  day: 'numeric', month: 'long' };
  var day = today.toLocaleString("en-US", options);
  res.render("list", {Listtitle: day, newlistitems: items});
});

app.get('/work', function(req, res){
  res.render("list", {Listtitle: "WorkList", newlistitems: workitems});
});

app.post('/', function(req, res) {
  item = req.body.NewItem;
  if(req.body.name === "WorkList") {
    workitems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(3000 , function() {
  console.log("Listening on port 3000");
});
