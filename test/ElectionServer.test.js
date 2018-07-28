const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const request = require('request')
const should = chai.should()
const db = require('../server/models')
chai.use(chaiHttp)

describe('TESTING ELECTION', ()=>{
  const dummyData = {
    name: 'Pemilihan Presiden',
    description : 'Test',
    startDate: new Date(),
    endDate: new Date(),
    blockchainAddress: 'facebook.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    CommunityId: 3
  }
  const test = 4

  it('should register new election',  function(done){
    chai
      .request('http://localhost:3000')
      .post('/api/elections/')
      .send(dummyData)
      .end((err,res)=>{
      expect(res).to.have.status(200)
      db.Election.destroy({
              where:{
                id: res.body.value.id
              }
            })
      .then(()=>{
          done()
        })
      })
  })

  it('should get all elections', function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/elections/')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.value.should.be.an('array')
        data.should.have.property('message').equal('mendapatkan data election')
        res.body.should.have.property('value')
        data.value[0].name.should.be.a('string')
        done()
      })
  })

  it('should get data election',  function(done){
    this.timeout(8000)
    chai
      .request('http://localhost:3000')
      .get('/api/elections/1')
      .end((err,res)=>{
        let data = res.body
        expect(res).to.have.status(200)
        data.should.have.property('message').equal('mendapatkan data election satuan')
        res.body.should.have.property('value')
        done()
      })
  })

  it('should edit an election data',  function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .put(`/api/elections/3`)
      .send({
        description: 'testing enviroment',
      })
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('value')
        done()
      })
  })
  
  it('should delete an election data',  function(done){
    this.timeout(8000)
    chai  
      .request('http://localhost:3000')
      .delete(`/api/elections/${test}`)
      .end(function(err, res){
        expect(res).to.have.status(200)
        res.body.should.have.property('message').equal('berhasil delete data election')
        done()
      })
  })

})