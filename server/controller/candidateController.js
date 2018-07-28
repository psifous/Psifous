const db = require('../models')

module.exports = {
  register : (req,res)=>{
    db.Candidate.create({
      name:req.body.name,
      image:req.body.image,
      description : req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      electionId: +(req.body.ElectionId)
    })
    .then((value)=>{
      res.status(200).json({
        message: ' berhasil buat user baru',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal membuat candidate',
      })
    })
  },

  getAllCandidate : (req,res)=>{
    db.Candidate.findAll()
    .then((value)=>{
      res.status(200).json({
        message:'berhasil kirim data semua candidate',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal kirim data candidate',
        err
      })
    })
  },

  getCandidate : (req,res)=>{
    db.Candidate.findOne({
      where:{
        id:req.params.id
      }
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil kirim data candidate',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal kirim data candidate',
        err
      })
    })
  },

  updateCandidate : (req,res)=>{
    db.Candidate.update(req.body,{where:{id:req.params.id}})
    .then((value)=>{
      res.status(200).json({
        message:'berhasil update candidate',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'terjadi kesalahan gagal update candidate'
      })
    })
  },

  deleteCandidate : (req,res)=>{
    db.Candidate.destroy({
      where:{
        id : req.params.id
      }
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil delete candidate',
        value
      })
      .catch((err)=>{
        res.status(400).json({
          message:'gagal hapus candidate'
        })
      })
    })
  }

}