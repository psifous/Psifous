const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const request = require('request')
const should = chai.should()
const db = require('../server/models')
chai.use(chaiHttp)

describe('TESTING CANDIDATE',()=>{
  const dummyData = {
    name: 'Jokowow',
    description:'mau jadi caleg masa depan',
    ElectionId: 2
  }

  it('should register candidate',function(done){
    chai
      .request('http://localhost:3000')
      .post('/api/candidates/')
      .send(dummyData)
      .end((err,res)=>{
      expect(res).to.have.status(200)
      db.Candidate.destroy({
              where:{
                id: res.body.value.id
              }
            })
      .then(()=>{
          done()
        })
      })
  })

  it('should get all data candidate',function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/candidates/')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.value.should.be.an('array')
        data.should.have.property('message').equal('berhasil kirim data semua candidate')
        res.body.should.have.property('value')
        data.value[0].name.should.be.a('string')
        done()
      })
  })

  it('should get data candidate', function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/candidates/1')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.should.have.property('message').equal('berhasil kirim data candidate')
        res.body.should.have.property('value')
        done()
      })
  })

  it('should edit candidate data', function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .put(`/api/candidates/2`)
      .send({
        name:'Sule',
      })
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('value')
        done()
      })
  })
  
  it('should delete candidate data', function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .delete(`/api/candidates/4`)
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('message').equal('berhasil delete candidate')
        done()
      })
  })
})