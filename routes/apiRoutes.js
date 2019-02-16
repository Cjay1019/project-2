var db = require("../models");
var axios = require("axios");
module.exports = function(app) {
  // Get all examples
  /*
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });
*/
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

  // Delete an example by id
  /*
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
  */
};
