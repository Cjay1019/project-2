var db = require("../models");
const axios = require("axios");
var questions = [];
module.exports = function(app) {
  //Start
  app.get("/api/questions", function(req, res) {
    var questions;
    var URL =
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
    axios.get(URL).then(function(response) {
      questions = response.data;
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

  app.get("/start", function(req, res) {
    var URL = "http://localhost:3000/api/questions";
    axios.get(URL).then(function(response) {
      questions = response.data.results;
      res.json(questions);
    });
  });
};
