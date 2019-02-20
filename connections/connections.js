var sockets = function(io) {
  var players = [];
  var player1Turn = true;
  var scores = {
    player1: 0,
    player2: 0
  };
  io.on("connection", function(socket) {
    console.log("user connected");
    socket.on("new name", function(name) {
      players.push(name);
      io.emit("new name", players);
    });
    socket.on("start", function(questions) {
      io.emit("start", questions);
    });
    socket.on("submit", function(data) {
      switch (data.player) {
        case 1:
          if (data.result === "right") {
            scores.player1++;
          }
          break;
        case 2:
          if (data.result === "right") {
            scores.player2++;
          }
          break;
      }
      io.emit("submit", scores);
    });
    socket.on("disconnect", function() {
      console.log("user disconnected");
      players = [];
      player1Turn = true;
      scores = {
        player1: 0,
        player2: 0
      };
      io.emit("disconnect");
    });
  });
};

module.exports = sockets;
