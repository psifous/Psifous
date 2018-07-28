const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const request = require('request')
const app = require('../server/index')
const should = chai.should()
const db = require('../server/models')
chai.use(chaiHttp)

describe('TESTING USER', () => {
    const dummyData = {
      email: 'test75@email.com',
      first_name: 'test',
      last_name: 'doang',
      password : 'hashpassword',
      createdAt: new Date(),
      updatedAt: new Date()
    }

  it('should register user', function(done){
    chai
    .request(app)
    .post('/users/')
    .send(dummyData)
    .end((err, res) => {
      let data = res.body
      expect(res).to.have.status(200)
      data.value.email.should.be.a('string')
      db.User.destroy({
        where:{
          id: data.value.id
        }
      })
      .then(()=>{
        done()
      })
    })
  })

  it('should get data user',function(done){
    this.timeout(8000)
    chai
      .request(app)
      .get('/users/1')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.value.should.be.an('object')
        data.should.have.property('message').equal(' berhasil kirim data personal')
        res.body.should.have.property('value')
        data.value.first_name.should.be.a('string')
        data.value.email.should.be.a('string')
        data.value.last_name.should.be.a('string')
        data.value.password.should.be.a('string')
        done()
      })
  })

  it('should get all data user', function(done){
    this.timeout(8000)
    chai
      .request(app)
      .get('/users/')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.should.have.property('message').equal('kirim semua data')
        res.body.should.have.property('value')
        done()
      })
  })

  it('should edit an user data', function(done){
    this.timeout(8000)
    chai  
      .request(app)
      .put(`/users/10`)
      .send({
        last_name: 'aliong',
      })
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('value')
        done()
      })
  })
  
  it('should delete an user', function(done){
    this.timeout(8000)
    chai  
      .request(app)
      .delete(`/10`)
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('message').equal('berhasil delete data')
        done()
      })
  })

})