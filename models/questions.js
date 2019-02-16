module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define(
    "Questions",
    {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      classMethods: {
        associate: function(models) {
          //associations defined here
        }
      }
    }
  );
  return Questions;
};
