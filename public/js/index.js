$("#question_container").hide();
$("#result_container").hide();
//$(".waiting").hide();
<<<<<<< HEAD
=======

>>>>>>> 6cd2141147e46b4e4433b2ceec1b1ed49dc787fe

// The API object contains methods for each kind of request we'll make
var API = {
  saveUsers: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/end",
      data: JSON.stringify(example)
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/end",
      type: "GET"
    });
  }
};

$("#start_button").on("click", function() {
  // Hide the waiting box
  $(".waiting").hide();

  $("#question_container").show();
});

<<<<<<< HEAD
//update with html tags ***************************************************
var example = {
  user_name: $username1.val().trim(),
  wins: $score1.val().trim()
};
=======
;
>>>>>>> 6cd2141147e46b4e4433b2ceec1b1ed49dc787fe

if (!(example.user_name && example.wins)) {
  alert("You must enter an example text and description!");
  return;
}

API.saveExample(example).then(function() {
  refreshExamples();
});

$("#submit_button").on("click", function() {
  $("#question_container").hide();
  $("#result_container").show();
});

<<<<<<< HEAD
// experimental checking to see if user exist in database, if not, create new user entry

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
=======

$("#submit_button").on("click", function() {
  $("#question_container").hide();
  $("#result_container").show();
});
>>>>>>> 6cd2141147e46b4e4433b2ceec1b1ed49dc787fe
