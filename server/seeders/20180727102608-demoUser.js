module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'test1@email.com',
      first_name: 'test1',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test2@email.com',
      first_name: 'test2',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test3@email.com',
      first_name: 'test3',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test4@email.com',
      first_name: 'test4',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test5@email.com',
      first_name: 'test5',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test6@email.com',
      first_name: 'test6',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test7@email.com',
      first_name: 'test7',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test8@email.com',
      first_name: 'test8',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test9@email.com',
      first_name: 'test9',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'test10@email.com',
      first_name: 'test10',
      last_name: 'test',
      password: "12345",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};