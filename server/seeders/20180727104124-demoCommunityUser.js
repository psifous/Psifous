module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CommunityUsers', [{
      UserId: 1,
      CommunityId:1,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 2,
      CommunityId:1,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 3,
      CommunityId:1,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 4,
      CommunityId:2,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 5,
      CommunityId:2,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 6,
      CommunityId:2,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 7,
      CommunityId:3,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 8,
      CommunityId:3,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 9,
      CommunityId:3,   
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      UserId: 10,
      CommunityId:3,   
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CommunityUsers', null, {});
  }
};