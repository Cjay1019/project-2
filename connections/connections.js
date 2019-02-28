var sockets = function(io) {
  var gameData = {
    player1: 0,
    player2: 0,
    questionNum: 0,
    players: []
  };

  io.on("connection", function(socket) {
    console.log("user connected");

    socket.on("new name", function(name) {
      gameData.players.push(name);
      io.emit("new name", gameData.players);
    });

    socket.on("start", function(questions) {
      io.emit("start", questions);
    });

    socket.on("submit", function(data) {
      gameData.questionNum++;
      switch (data.player) {
        case 1:
          if (data.result === "right") {
            gameData.player1++;
          }
          break;
        case 2:
          if (data.result === "right") {
            gameData.player2++;
          }
          break;
      }
      io.emit("submit", gameData);
    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
      gameData = {
        player1: 0,
        player2: 0,
        questionNum: 0,
        players: []
      };
      io.emit("disconnect");
    });
  });
};

module.exports = sockets;
