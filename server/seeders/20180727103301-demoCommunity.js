module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Communities', [{
      name: 'Sepakbola',
      location: 'Jakarta Pusat',
      createdAt: new Date(),
      updatedAt: new Date(),
      AdminId: 1
    },{
      name: 'Basket',
      location: 'Jawa Barat',
      createdAt: new Date(),
      updatedAt: new Date(),
      AdminId: 2
    },{
      name: 'Volley',
      location: 'Papua Tengah',
      createdAt: new Date(),
      updatedAt: new Date(),
      AdminId: 3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Communities', null, {});
  }
};
