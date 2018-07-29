const db = require('../models')

module.exports={
  createCommunity : async (req,res) => {
    
    try {
      let newCommunity = {
        name: req.body.name,
        location:req.body.location,
        createdAt: new Date(),
        updatedAt: new Date(),
        AdminId: req.body.AdminId
      }
      let value = await db.Community.create(newCommunity)
      
      res.status(201).json({
        message:'berhasil create komunitas',
        value
      })

    } catch (err) {
      res.status(400).json({
        message:'gagal create komunitas',
        err
      })
    }
  },

  getOneCommunity : async (req,res) => {
    try {
      let value = await db.Community.find({
        where:{
          id : req.params.id
        },
        include:[
          db.Election,
          db.User,
          db.Admin
        ]
      })
      res.status(200).json({
        message:'berhasil kirim data satu komunitas',
        value
      })

    } catch (err) {
      res.status(400).json({
        message:'terjadi kesalahan',
        err
      })
    }
  },

  getCommunityData : async (req,res) => {
    try {
      let value = await db.Community.findAll()
      res.status(200).json({
        message:'berhasil mendapat daftar komunitas',
        value
      })

    } catch (err) {
      res.status(400).json({
        message:'gagal mendapat daftar komunitas',
        err
      })
    }
  },

  deleteData : async (req,res) => {
    try {
      let value = await db.Community.destroy({
        where:{
          id:req.params.id
        }
      })
      res.status(200).json({
        message:'berhasil delete komunitas',
        value
      })
    } catch (err) {
      res.status(400).json({
        message:'gagal delete',
        err
      })
    }
  },

  updateData: async (req,res) => {
    try {
     let value = await db.Community.update(req.body,{where:{id:req.params.id}})
     res.status(200).json({
       message:'berhasil update komunitas',
       value
     })
    } catch (err) {
      res.status(400).json({
        message:'gagal update',
        err
      })
    }
  }
}