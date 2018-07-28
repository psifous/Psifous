'use strict';
module.exports = (sequelize, DataTypes) => {
  var CommunityUser = sequelize.define('CommunityUser', {
    UserId: DataTypes.INTEGER,
    CommunityId: DataTypes.INTEGER
  }, {});
  CommunityUser.associate = function(models) {
    // associations can be defined here
  };
  return CommunityUser;
};