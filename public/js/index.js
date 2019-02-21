$(function() {
  var socket = io();

  var clientName;

  function userNames() {
    var name = prompt("Enter a username");
    if (name === null) {
      alert("Username cannot be blank");
      userNames();
    } else {
      socket.emit("new name", name);
    }
  }
  userNames();
  socket.on("new name", function(names) {
    console.log(names);
    if (names.length === 1) {
      clientName = names[0];
      $(".username1").text(names[0]);
    } else {
      clientName = names[1];
      $(".username1").text(names[0]);
      $(".username2").text(names[1]);
    }
  });

  socket.on("disconnect", function() {
    $("#question_container").hide();
    $("#result_container").show();
    $(".waiting").hide();
  });
  //todd------------------------------------------------------------------------------------------

  var API = {
    saveExample: function(example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function() {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    }

  //i think i need to format these two like the above examples?

  // This function updates a user in our database
  function updateUsers(currentUsers) {
    $.ajax({
      method: "PUT",
      url: "/api/end",
      data: currentUsers
    }).then(getUsers);
  }

  // This function inserts a new user into our database and then updates the view
  function newUser(user_name) {
    user_name.preventDefault();
    var newUser = {
      text: $("names[0]")
        .val()
        .trim(),
      complete: false
    };

    $.post("/api/end", user_name, getUsers);
    $("newUserInput").val("");
  }
  
  //---------------------------------------------------------------------------------------------

  $("#start_button").on("click", function() {
    // Hide the waiting box
    $(".waiting").hide();

    $("#question_container").show();
  });

  // var example = {
  //   user_name: $("#exampleText")
  //     .val()
  //     .trim(),
  //   wins: $("exampleDescription")
  //     .val()
  //     .trim()
  // };

  // if (!(example.user_name && example.wins)) {
  //   alert("You must enter an example text and description!");
  // }

  // API.saveExample(example).then(function() {
  //   refreshExamples();
  // });

  $("#submit_button").on("click", function() {
    $("#question_container").hide();
    $("#result_container").show();
  });
});
