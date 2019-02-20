var sockets = function(io) {
  var players = [];
  var player1Turn = true;
  io.on("connection", function(socket) {
    console.log("user connected");
    socket.on("new name", function(name) {
      players.push(name);
      io.emit("new name", players);
    });
    socket.on("disconnect", function() {
      console.log("user disconnected");
      players = [];
      player1Turn = true;
      io.emit("disconnect");
    });
  });
};

module.exports = sockets;
