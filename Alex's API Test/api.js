$(".start").on("click", function(event){
    //var difficulty = "hard";
    var URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple";
    event.preventDefault();
    $.ajax({
        url: URL,
        method: "GET"
    }).then(function(response){
        console.log(response.results);
        for (var i = 0; i < response.results.length; i++){
            $("#question" + i).text(response.results[i].question);
            randomChoiceOrder = Math.floor(Math.random() * 4)
            switch (randomChoiceOrder){
                case 0:
                    $("#choice" + i + "a").text(response.results[i].correct_answer);
                    $("#choice" + i + "b").text(response.results[i].incorrect_answers[0]);
                    $("#choice" + i + "c").text(response.results[i].incorrect_answers[1]);
                    $("#choice" + i + "d").text(response.results[i].incorrect_answers[2]);
                break;
                case 1:
                    $("#choice" + i + "a").text(response.results[i].incorrect_answers[0]);
                    $("#choice" + i + "b").text(response.results[i].correct_answer);
                    $("#choice" + i + "c").text(response.results[i].incorrect_answers[1]);
                    $("#choice" + i + "d").text(response.results[i].incorrect_answers[2]);
                break;
                case 2:
                    $("#choice" + i + "a").text(response.results[i].incorrect_answers[0]);
                    $("#choice" + i + "b").text(response.results[i].incorrect_answers[1]);
                    $("#choice" + i + "c").text(response.results[i].correct_answer);
                    $("#choice" + i + "d").text(response.results[i].incorrect_answers[2]);
                break;
                case 3:
                    $("#choice" + i + "a").text(response.results[i].incorrect_answers[0]);
                    $("#choice" + i + "b").text(response.results[i].incorrect_answers[1]);
                    $("#choice" + i + "c").text(response.results[i].incorrect_answers[2]);
                    $("#choice" + i + "d").text(response.results[i].correct_answer);
                break;
            }          
        }
    });
});

