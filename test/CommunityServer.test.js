const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const request = require('request')
const should = chai.should()
const db = require('../server/models')
chai.use(chaiHttp)

describe('TESTING COMMUNITY',()=>{
  const dummyData = {
    name: 'Pemilihan Presiden',
    location : 'Indonesia',
    createdAt: new Date(),
    updatedAt: new Date(),
    AdminId : 4
  }

  it('should register new community',function(done){
    chai
      .request('http://localhost:3000')
      .post('/api/communities/')
      .send(dummyData)
      .end((err,res)=>{
      expect(res).to.have.status(200)
      db.Community.destroy({
              where:{
                id: res.body.value.id
              }
            })
      .then(()=>{
          done()
        })
      })
  })

  it('should get all communities',function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/communities/')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.value.should.be.an('array')
        data.should.have.property('message').equal('berhasil kirim data komunitas')
        res.body.should.have.property('value')
        data.value[0].name.should.be.a('string')
        done()
      })
  })

  it('should get data community', function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/communities/1')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.should.have.property('message').equal('berhasil kirim data satu komunitas')
        res.body.should.have.property('value')
        done()
      })
  })

  it('should update a community data', function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .put(`/api/communities/4`)
      .send({
        location: 'trenggalek',
      })
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('value')
        done()
      })
  })
  
  it('should delete an election data', function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .delete(`/api/communities/4`)
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('message').equal('berhasil delete komunitas')
        done()
      })
  })
})