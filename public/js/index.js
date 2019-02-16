$("#question_container").hide();
$("#result_container").hide();
//$(".waiting").hide();

$("#start_button").on("click", function() {
  // Hide the waiting box
  $(".waiting").hide();

  $("#question_container").show();
});

$("#submit_button").on("click", function() {
  $("#question_container").hide();
  $("#result_container").show();
});
