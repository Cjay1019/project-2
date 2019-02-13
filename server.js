require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path")

var env = require('dotenv').load();

var app = express();
var PORT = process.env.PORT || 3000;

//MySQL Passport
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
var models = require("./models");
var authRoute = require('./routes/auth.js')(app,passport);
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/', function(req, res) {
 
  res.send('Welcome to Passport with Sequelize');

});


app.listen(5000, function(err) {

  if (!err)
      console.log("Site is live");
  else console.log(err)

});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "public"));

// Handlebars
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", "hbs");



var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

models.sequelize.sync().then(function(){
  console.log('Nice! Database looks fine')
}).catch(function(err){
  console.log(err, "Something went wrong with the Database Update!")
})
module.exports = app;
