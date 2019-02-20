var questions;
var questionNum = 0;
var numRight = 0;

$("#start_button").on("click", function() {
  $.get("/start", function(response) {
    questionNum = 0;
    questions = response;
    console.log(response);
    $("#question").text(response[0].question);
    randomChoiceOrder = Math.floor(Math.random() * 4);
    switch (randomChoiceOrder) {
      case 0:
        $("#a1").text(response[0].correct_answer);
        $("#a2").text(response[0].incorrect_answers[0]);
        $("#a3").text(response[0].incorrect_answers[1]);
        $("#a4").text(response[0].incorrect_answers[2]);
        break;
      case 1:
        $("#a1").text(response[0].incorrect_answers[0]);
        $("#a2").text(response[0].correct_answer);
        $("#a3").text(response[0].incorrect_answers[1]);
        $("#a4").text(response[0].incorrect_answers[2]);
        break;
      case 2:
        $("#a1").text(response[0].incorrect_answers[0]);
        $("#a2").text(response[0].incorrect_answers[1]);
        $("#a3").text(response[0].correct_answer);
        $("#a4").text(response[0].incorrect_answers[2]);
        break;
      case 3:
        $("#a1").text(response[0].incorrect_answers[0]);
        $("#a2").text(response[0].incorrect_answers[1]);
        $("#a3").text(response[0].incorrect_answers[2]);
        $("#a4").text(response[0].correct_answer);
        break;
    }
  });
});

$("#submit_button").on("click", function() {
  var radioValue = $("input[name='q_answer']:checked").val();
  console.log(radioValue);
  var selectedAnswer = $("#a" + radioValue).text();
  if (selectedAnswer === questions[questionNum].correct_answer) {
    numRight++;
    console.log("You Are Right");
    console.log(numRight);
  } else {
    console.log("You Are Wrong");
  }

  console.log(radioValue);
  questionNum++;
  $("#question").text(questions[questionNum].question);
  randomChoiceOrder = Math.floor(Math.random() * 4);
  switch (randomChoiceOrder) {
    case 0:
      $("#a1").text(questions[questionNum].correct_answer);
      $("#a2").text(questions[questionNum].incorrect_answers[0]);
      $("#a3").text(questions[questionNum].incorrect_answers[1]);
      $("#a4").text(questions[questionNum].incorrect_answers[2]);
      break;
    case 1:
      $("#a1").text(questions[questionNum].incorrect_answers[0]);
      $("#a2").text(questions[questionNum].correct_answer);
      $("#a3").text(questions[questionNum].incorrect_answers[1]);
      $("#a4").text(questions[questionNum].incorrect_answers[2]);
      break;
    case 2:
      $("#a1").text(questions[questionNum].incorrect_answers[0]);
      $("#a2").text(questions[questionNum].incorrect_answers[1]);
      $("#a3").text(questions[questionNum].correct_answer);
      $("#a4").text(questions[questionNum].incorrect_answers[2]);
      break;
    case 3:
      $("#a1").text(questions[questionNum].incorrect_answers[0]);
      $("#a2").text(questions[questionNum].incorrect_answers[1]);
      $("#a3").text(questions[questionNum].incorrect_answers[2]);
      $("#a4").text(questions[questionNum].correct_answer);
      break;
  }
});
