var db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  //Start
  app.get("/api/start", function(req, res) {
    var questions;
    var URL =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple";
    axios.get(URL).then(function(response) {
      console.log(response.data);
      questions = response.data;
      console.log(questions);
      res.json(questions);
    });
  });

  // top score route
  app.get("/api/end", function(req, res) {
    console.log("get");
    //get prarams
    db.users.findAll({}).then(function(results) {
      // if results includes params, then update
      //else create with params
      res.json(results);
      console.log("Top score message " + results);
    });
    // res.end();
  });

  // If a user sends data to add a new user...
  app.post("/api/end", function(req, res) {
    console.log("post");
    db.users.create(req.body).then(function(dbExample) {
      res.json(dbExample); // Take the request...
    });
  });
};

// Our initial current user array
var currentUsers = [];

// Getting current users from database when game ends
getUsers();

// This function grabs current users from the database and updates their wins
function getUsers() {
  $.get("/api/end", function(data) {
    currentUsers = data;
  });
}

// This function updates a todo in our database
function updateUsers(currentUsers) {
  $.ajax({
    method: "PUT",
    url: "/api/end",
    data: currentUsers
  }).then(getUsers);
}

// This function inserts a new todo into our database and then updates the view
function newUser(user_name) {
  user_name.preventDefault();
  var newUser = {
    text: $newUserInput.val().trim(),
    complete: false
  };

  $.post("/api/end", user_name, getUsers);
  $newUserInput.val("");
}
