const db = require('../models')

module.exports ={
  createElection : (req,res)=>{
    db.Election.create({
      name : req.body.name,
      description : req.body.description,
      startDate : req.body.startDate,
      endDate: req.body.endDate,
      blockchainAddress: req.body.blockchainAddress,
      CommunityId:req.body.CommunityId
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil create election',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'gagal create election',
        err
      })
    })
  },

  getAllElection : (req,res)=>{
    db.Election.findAll()
    .then((value)=>{
      res.status(200).json({
        message:'mendapatkan data election',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'terjadi kesalahan',
        err
      })
    })
  },

  getOneElection : (req,res)=>{
    db.Election.find({
      where:{id:req.params.id},
      include:[
        db.Candidate
      ]
    })
    .then((value)=>{
      res.status(200).json({
        message:'mendapatkan data election satuan',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'terjadi kesalahan',
        err
      })
    })
  },

  updateElection : (req,res)=>{
    db.Election.update(req.body,{where:{id:req.params.id}})
    .then((value)=>{
      console.log('masuk then',value)
      res.status(200).json({
        message:'berhasil update election',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'terjadi kesalahan saat update election'
      })
    })
  },

  deleteElection :(req,res)=> {
    db.Election.destroy({where:{id:req.params.id}})
    .then((value)=>{
      res.status(200).json({
        message:'berhasil delete data election',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal delete data election',
        err
      })
    })
  }
}