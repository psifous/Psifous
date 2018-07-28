module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Admins', [{
      email: 'testadmin1@email.com',
      first_name: 'testadmin1',
      last_name: 'Admin',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
      CommunityId : 1
    },{
      email: 'testadmin2@email.com',
      first_name: 'testadmin2',
      last_name: 'Admin',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
      CommunityId: 2
    },{
      email: 'testadmin3@email.com',
      first_name: 'testadmin3',
      last_name: 'Admin',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
      CommunityId: 3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};