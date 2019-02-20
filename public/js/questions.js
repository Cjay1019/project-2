$(function() {
  var socket = io();

  var questions;
  var questionNum = 0;
  var numRight = 0;
  var numWrong = 0;

  $("#start_button").on("click", function() {
    $.get("/start", function(response) {
      questionNum = 0;
      questions = response;
      $(".waiting").hide();
      $("#question_container").show();

      $("#question").text(decode(response[0].question));
      randomChoiceOrder = Math.floor(Math.random() * 4);
      switch (randomChoiceOrder) {
        case 0:
          $("#a1").text(decode(response[0].correct_answer));
          $("#a2").text(decode(response[0].incorrect_answers[0]));
          $("#a3").text(decode(response[0].incorrect_answers[1]));
          $("#a4").text(decode(response[0].incorrect_answers[2]));
          break;
        case 1:
          $("#a1").text(decode(response[0].incorrect_answers[0]));
          $("#a2").text(decode(response[0].correct_answer));
          $("#a3").text(decode(response[0].incorrect_answers[1]));
          $("#a4").text(decode(response[0].incorrect_answers[2]));
          break;
        case 2:
          $("#a1").text(decode(response[0].incorrect_answers[0]));
          $("#a2").text(decode(response[0].incorrect_answers[1]));
          $("#a3").text(decode(response[0].correct_answer));
          $("#a4").text(decode(response[0].incorrect_answers[2]));
          break;
        case 3:
          $("#a1").text(decode(response[0].incorrect_answers[0]));
          $("#a2").text(decode(response[0].incorrect_answers[1]));
          $("#a3").text(decode(response[0].incorrect_answers[2]));
          $("#a4").text(decode(response[0].correct_answer));
          break;
      }
    });
  });

  $("#submit_button").on("click", function() {
    //Goes to next question if the index of the question array is less than 9
    if (questionNum < 9) {
      var radioValue = $("input[name='q_answer']:checked").val();
      var selectedAnswer = $("#a" + radioValue).text();
      if (selectedAnswer === decode(questions[questionNum].correct_answer)) {
        numRight++;
        console.log("You Are Right");
        $("#score").text("Your Current Score: " + numRight);
        $("#num-wrong").text("Number of Wrong Answers: " + numWrong);
      } else {
        numWrong++;
        console.log("You Are Wrong");
        $("#score").text("Your Current Score: " + numRight);
        $("#num-wrong").text("Number of Wrong Answers: " + numWrong);
      }

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
        numRight++;
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
