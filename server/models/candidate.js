const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  var Candidate = sequelize.define('Candidate', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    description:{
      type: Sequelize.TEXT
    },
    ElectionId:{
      type: Sequelize.INTEGER
    } 
  }, {});


  Candidate.associate = function(models) {
    Candidate.belongsTo(models.Election)
  };

  return Candidate;
};