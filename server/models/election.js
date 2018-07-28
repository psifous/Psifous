const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  var Election = sequelize.define('Election', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE,
    },
    blockchainAddress: {
      type: Sequelize.STRING
    },
    CommunityId:{
      type: Sequelize.INTEGER
    }
  }, {});
  
  Election.associate = function(models) {
    Election.belongsTo(models.Community);
    Election.hasMany(models.Candidate);
  };

  return Election;
};