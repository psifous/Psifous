const Sequelize = require('sequelize')


module.exports = (sequelize, DataTypes) => {
  var Community = sequelize.define('Community', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    AdminId:{
      type: Sequelize.INTEGER,
    }
  }, {});

  Community.associate = function(models) {
    Community.belongsToMany(models.User,{through:models.CommunityUser});
    Community.hasMany(models.Election);
    Community.belongsTo(models.Admin);
  };

  return Community;
};