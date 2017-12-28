var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
mongoose.Promise = global.Promise;

var nameSchema = new mongoose.Schema({
	firstName: String,
	LastName: String
});

var User = mongoose.model("User", nameSchema);

// Connect to database
mongoose.connect("mongodb://localhost:27017/db/node-demo-app");
 
 // Read the html file
app.get("/", (req, res) => {
	res.sendFile(__dirname+"/index.html" )
});
 
 // Listening to port 3000
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

// Body parser Module Configure
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Get Method to save data into  the database
app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});