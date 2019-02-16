var db = require("../models");

module.exports = function(app) {
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
