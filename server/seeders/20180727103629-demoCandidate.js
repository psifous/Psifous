module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Candidates', [{
      name: 'Tatang Suherman',
      image:'ga ada gambar',
      description:'calon yang masih belum memiliki pekerjaan',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:1
    },{
      name: 'Cak Lontongs',
      image:'ga ada gambar',
      description:'calon kaga punya visi dan misi yang jelas',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:1
    },{
      name: 'Benny Dolo',
      image:'ga ada gambar',
      description:'calon yang masih belum memiliki pekerjaan',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:1
    },{
      name: 'Kobe Beef',
      image:'ga ada gambar',
      description:'calon kaga punya visi dan misi yang jelas',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:2
    },{
      name: 'James McGreggor',
      image:'ga ada gambar',
      description:'calon yang masih belum memiliki pekerjaan',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:2
    },{
      name: 'Bang Toyib',
      image:'ga ada gambar',
      description:'calon kaga punya visi dan misi yang jelas',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:2
    },{
      name: 'Tao Ming Tse',
      image:'ga ada gambar',
      description:'calon yang masih belum memiliki pekerjaan',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:3
    },{
      name: 'Gu Jun Pyo',
      image:'ga ada gambar',
      description:'calon kaga punya visi dan misi yang jelas',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:3
    },{
      name: 'Domyoji Tsukasa',
      image:'ga ada gambar',
      description:'calon yang masih belum memiliki pekerjaan',   
      createdAt: new Date(),
      updatedAt: new Date(),
      ElectionId:3
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Candidates', null, {});
  }
};