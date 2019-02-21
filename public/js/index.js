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
    $("#player2").hide();
    $("#player1").hide();
    $("#winner").append(clientName + "!");
  });
  // Alex's Question logic
  var questions = [];
  var questionNum = 0;
  var player1Turn = true;

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
    var selectedAnswer = $("#a" + radioValue)
      .text()
      .trim();
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
    $("#submit_button").hide();
    player1Turn = !player1Turn;
    questionNum = result.questionNum;
    $(".score1").text(result.player1);
    $(".score2").text(result.player2);
    if (player1Turn === true && playerNumber === 1) {
      $("#submit_button").show();
    } else if (player1Turn === false && playerNumber === 2) {
      $("#submit_button").show();
    }
    //Goes to next question if the index of the question array is less than 9
    if (questionNum < 9) {
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
      $("#question_container").hide();
      $("#result_container").show();
      $("#player2").hide();
      $("#player1").hide();
      if (result.player1 > result.player2) {
        $("#winner").append(result.players[0] + "!");
      } else if (result.player1 < result.player2) {
        $("#winner").append(result.players[1]) + "!";
      } else {
        $("#winner").append("It's a tie!");
      }
      $(".score1").text(result.player1);
      $(".score2").text(result.player2);
    }
    console.log(result);
  });

  function decode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
});
