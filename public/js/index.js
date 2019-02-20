$("#question_container").hide();
$("#result_container").hide();
//$(".waiting").hide();


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/end",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/end",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

$("#start_button").on("click", function() {
  // Hide the waiting box
  $(".waiting").hide();

  $("#question_container").show();
});

;

  var example = {
    user_name: $exampleText.val().trim(),
    wins: $exampleDescription.val().trim()
  };

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
