var db = require("../models");

module.exports = function(app) {
  // Load index page
<<<<<<< HEAD
  //   app.get("/", function(req, res) {
  //     db.users.findAll({}).then(function(dbExamples) {
  //       res.render("index", {
  //         msg: "Welcome!",
  //         examples: dbExamples
  //       });
  //     });
  //   });
=======
//   app.get("/", function(req, res) {
//     db.users.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });
>>>>>>> 6cd2141147e46b4e4433b2ceec1b1ed49dc787fe

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.users
  //     .findOne({ where: { id: req.params.id } })
  //     .then(function(dbExample) {
  //       res.render("example", {
  //         example: dbExample
  //       });
  //     });
  // });

  // Load example page and pass in an example by id
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
