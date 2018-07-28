module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Elections', [{
      name: 'Pemain bola terbaik masa kini',
      description:'ya begitulah',
      startDate: '2018-07-27T08:45:25.821Z',
      endDate:'2018-07-30T08:45:25.821Z',
      blockchainAddress:'www.google.com',
      createdAt:new Date(),
      updatedAt: new Date(),
      CommunityId:1,
    },{
      name: 'Pemain basket terbaik tahun 2000',
      description:'ya begitulah',
      startDate: '2018-07-27T08:45:25.821Z',
      endDate:'2018-07-30T08:45:25.821Z',
      blockchainAddress:'www.google.com',
      createdAt:new Date(),
      updatedAt: new Date(),
      CommunityId:2
    },{
      name: 'Pelatih Volley masa kini',
      description:'ya begitulah',
      startDate: '2018-07-27T08:45:25.821Z',
      endDate:'2018-07-30T08:45:25.821Z',
      blockchainAddress:'www.google.com',
      createdAt:new Date(),
      updatedAt: new Date(),
      CommunityId:3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Elections', null, {});
  }
};