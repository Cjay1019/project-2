module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    user_name: DataTypes.STRING,
    wins: DataTypes.TEXT
  });
  return users;
};
