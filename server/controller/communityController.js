const db = require('../models')

module.exports={
  createCommunity : (req,res)=>{
    db.Community.create({
      name: req.body.name,
      location:req.body.location,
      createdAt: new Date(),
      updatedAt: new Date(),
      AdminId: req.body.AdminId
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil create komunitas',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal create komunitas',
        err
      })
    })
  },
  getOneCommunity : (req,res)=>{
    db.Community.find({
      where:{
        id : req.params.id
      },
      include:[
        db.Election,
        db.User,
        db.Admin
      ]
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil kirim data satu komunitas',
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
  getCommunityData :(req,res)=>{
    db.Community.findAll()
    .then((value)=>{
      res.status(200).json({
        message:'berhasil kirim data komunitas',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal kirim data komunitas',
        err
      })
    })
  },
  deleteData :(req,res)=>{
    db.Community.destroy({
      where:{
        id:req.params.id
      }
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil delete komunitas'
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal delete',
        err
      })
    })
  },
  updateData:(req,res)=>{
    db.Community.update(req.body,{where:{id:req.params.id}})
    .then((value)=>{
      res.status(200).json({
        message:'berhasil update komunitas',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal update',
        err
      })
    })
  }
}