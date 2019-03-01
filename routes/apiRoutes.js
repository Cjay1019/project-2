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
  app.post("/api/end", function(req, res) {
    db.users.findAll({}).then(function(results) {
      for (i = 0; i < results.length; i++) {
        if (req.body.user_name === "tie") {
          return;
        } else if (results[i].user_name === req.body.user_name) {
          var updated = {
            user_name: results[i].user_name,
            wins: results[i].wins + 1
          };
          db.users
            .update(updated, {
              where: {
                user_name: updated.user_name
              }
            })
            .then(function() {
              db.users
                .findAll({ order: [["wins", "DESC"]] })
                .then(function(results2) {
                  res.json(results2);
                });
            });
          return;
        }
      }
      db.users.create(req.body).then(function(data) {});
      res.json(results);
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
