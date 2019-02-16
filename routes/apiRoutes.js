var db = require("../models");
var axios = require("axios");
module.exports = function(app) {
  //API Calls
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
};
