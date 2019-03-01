$(function() {
  var socket = io();

  var clientName;
  var playerNumber = null;
  var gameCompleted = null;

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
        $(".tenor-gif-embed").hide();
      } else {
        $("#waiter").text("Waiting For Game To Start");
        playerNumber = 2;
      }
    }
  });

  socket.on("disconnect", function() {
    if (gameCompleted === false) {
      winner = { user_name: clientName };
      $("#question_container").hide();
      $("#result_container").show();
      $(".waiting").hide();
      $("#player2").hide();
      $("#player1").hide();
      $("#winner").append(clientName + "!");
      $.post("/api/end", winner).then(function(data) {
        leaders(data);
      });
      gameOver();
    } else if (gameCompleted === null) {
      location.reload();
    }
  });
  // Alex's Question logic
  var questions = [];
  var questionNum = 0;
  var player1Turn = true;

  $("#start_button").on("click", function() {
    $.get("/api/questions", function(response) {
      questionNum = 0;
      questions = response;
      socket.emit("start", questions);
    });
  });

  socket.on("start", function(response) {
    gameCompleted = false;
    $("#user1").attr({ class: "username1 active" });
    questions = response;
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
    if (selectedAnswer === decode(questions[questionNum].correct_answer)) {
      answerData.result = "right";
    } else {
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
    if (player1Turn === true) {
      $("#user1").attr({ class: "username1 active" });
      $("#user2").attr({ class: "username2" });
    } else {
      $("#user1").attr({ class: "username1" });
      $("#user2").attr({ class: "username2 active" });
    }
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
      var winner;
      $("#question_container").hide();
      $("#result_container").show();
      $("#player2").hide();
      $("#player1").hide();
      if (result.player1 > result.player2) {
        $("#winner").append(result.players[0] + "!");
        winner = { user_name: result.players[0], wins: 1 };
      } else if (result.player1 < result.player2) {
        $("#winner").append(result.players[1]) + "!";
        winner = { user_name: result.players[1], wins: 1 };
      } else {
        $("#winner").append("It's a tie!");
        winner = { user_name: "tie" };
      }
      $(".score1").text(result.player1);
      $(".score2").text(result.player2);
      if (winner.user_name === clientName) {
        $.post("/api/end", winner).then(function(data) {
          leaders(data);
        });
      }
      gameOver();
    }
  });

  function gameOver() {
    gameCompleted = true;
    clientName = null;
    playerNumber = null;
    questions = [];
    questionNum = null;
    player1Turn = null;
  }

  function leaders(data) {
    $("#lp1").text(data[0].user_name);
    $("#ls1").text(data[0].wins);
    $("#lp2").text(data[1].user_name);
    $("#ls2").text(data[1].wins);
    $("#lp3").text(data[2].user_name);
    $("#ls3").text(data[2].wins);
    $("#lp4").text(data[3].user_name);
    $("#ls4").text(data[3].wins);
    $("#lp5").text(data[4].user_name);
    $("#ls5").text(data[4].wins);
  }

  function decode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
});
