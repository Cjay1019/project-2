$(function() {
  var socket = io();

  var clientName;
  var playerNumber = null;

  function userNames() {
    var name = prompt("Enter a username");
    if (name === null) {
      alert("Username cannot be blank");
      userNames();
    } else {
      clientName = name;
      socket.emit("new name", name);
    }
  }
  userNames();
  socket.on("new name", function(names) {
    if (names.length === 1) {
      $(".username1").text(names[0]);
    } else {
      $(".username1").text(names[0]);
      $(".username2").text(names[1]);
      if (clientName === names[0]) {
        $("#start_button").show();
        $("#waiter").text("");
        playerNumber = 1;
      } else {
        $("#waiter").text("Waiting For Game To Start");
        playerNumber = 2;
      }
    }
  });

  socket.on("disconnect", function() {
    $("#question_container").hide();
    $("#result_container").show();
    $(".waiting").hide();
  });
  // Alex's Question logic
  var questions = [];
  var questionNum = 0;

  $("#start_button").on("click", function() {
    $.get("/start", function(response) {
      questionNum = 0;
      questions = response;
      socket.emit("start", questions);
    });
  });

  socket.on("start", function(response) {
    questions = response;
    console.log(questions);
    if (playerNumber !== 1) {
      $("#submit_button").hide();
    }
    $(".waiting").hide();
    $("#question_container").show();

    $("#question").text(decode(questions[0].question));
    randomChoiceOrder = Math.floor(Math.random() * 4);
    switch (randomChoiceOrder) {
      case 0:
        $("#a1").text(decode(questions[0].correct_answer));
        $("#a2").text(decode(questions[0].incorrect_answers[0]));
        $("#a3").text(decode(questions[0].incorrect_answers[1]));
        $("#a4").text(decode(questions[0].incorrect_answers[2]));
        break;
      case 1:
        $("#a1").text(decode(questions[0].incorrect_answers[0]));
        $("#a2").text(decode(questions[0].correct_answer));
        $("#a3").text(decode(questions[0].incorrect_answers[1]));
        $("#a4").text(decode(questions[0].incorrect_answers[2]));
        break;
      case 2:
        $("#a1").text(decode(questions[0].incorrect_answers[0]));
        $("#a2").text(decode(questions[0].incorrect_answers[1]));
        $("#a3").text(decode(questions[0].correct_answer));
        $("#a4").text(decode(questions[0].incorrect_answers[2]));
        break;
      case 3:
        $("#a1").text(decode(questions[0].incorrect_answers[0]));
        $("#a2").text(decode(questions[0].incorrect_answers[1]));
        $("#a3").text(decode(questions[0].incorrect_answers[2]));
        $("#a4").text(decode(questions[0].correct_answer));
        break;
    }
  });

  $("#submit_button").on("click", function() {
    var radioValue = $("input[name='q_answer']:checked").val();
    var selectedAnswer = $("#a" + radioValue).text();
    var answerData = {
      player: playerNumber,
      result: null
    };
    console.log(selectedAnswer);
    console.log(decode(questions[questionNum].correct_answer));
    if (selectedAnswer === decode(questions[questionNum].correct_answer)) {
      console.log("You Are Right");
      answerData.result = "right";
    } else {
      console.log("You Are Wrong");
      answerData.result = "wrong";
    }
    socket.emit("submit", answerData);
  });

  socket.on("submit", function(result) {
    $("#score1").text(result.player1);
    $("#score2").text(result.player2);
    //Goes to next question if the index of the question array is less than 9
    if (questionNum < 9) {
      questionNum++;
      $("#question").text(decode(questions[questionNum].question));
      randomChoiceOrder = Math.floor(Math.random() * 4);
      switch (randomChoiceOrder) {
        case 0:
          $("#a1").text(decode(questions[questionNum].correct_answer));
          $("#a2").text(decode(questions[questionNum].incorrect_answers[0]));
          $("#a3").text(decode(questions[questionNum].incorrect_answers[1]));
          $("#a4").text(decode(questions[questionNum].incorrect_answers[2]));
          break;
        case 1:
          $("#a1").text(decode(questions[questionNum].incorrect_answers[0]));
          $("#a2").text(decode(questions[questionNum].correct_answer));
          $("#a3").text(decode(questions[questionNum].incorrect_answers[1]));
          $("#a4").text(decode(questions[questionNum].incorrect_answers[2]));
          break;
        case 2:
          $("#a1").text(decode(questions[questionNum].incorrect_answers[0]));
          $("#a2").text(decode(questions[questionNum].incorrect_answers[1]));
          $("#a3").text(decode(questions[questionNum].correct_answer));
          $("#a4").text(decode(questions[questionNum].incorrect_answers[2]));
          break;
        case 3:
          $("#a1").text(decode(questions[questionNum].incorrect_answers[0]));
          $("#a2").text(decode(questions[questionNum].incorrect_answers[1]));
          $("#a3").text(decode(questions[questionNum].incorrect_answers[2]));
          $("#a4").text(decode(questions[questionNum].correct_answer));
          break;
      }
    } else {
      //ends the game
      var radioValue = $("input[name='q_answer']:checked").val();
      var selectedAnswer = $("#a" + radioValue).text();
      if (selectedAnswer === decode(questions[questionNum].correct_answer)) {
        console.log("You Are Right");
        $("#score").text("Your Final Score: " + numRight);
        $("#num-wrong").text("Number of Wrong Answers: " + numWrong);
      } else {
        numWrong++;
        console.log("You Are Wrong");
        $("#score").text("Your Final Score: " + numRight);
        $("#num-wrong").text("Number of Wrong Answers: " + numWrong);
      }
    }
  });

  function decode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
});
