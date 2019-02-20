//var db = require("../models");
//var path = require("path");

module.exports = function(app) {
  // Load index page
<<<<<<< HEAD
  app.get("/", function(req, res) {
    res.render("index");
  });
=======
>>>>>>> 57f9cc11e53bf0943680a55298cfc13c3ebdf846

  // Load example page and pass in an example by id
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
