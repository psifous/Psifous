const db = require('../models')

module.exports = {
  register: (req,res)=>{
    db.Admin.create({
      email:req.body.email,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      password:req.body.password,
      CommunityId : req.body.CommunityId
    })
    .then((value)=>{
      res.status(200).json({
        message: ' berhasil buat admin baru',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'email sudah terdaftar'
      })
    })
  },

  getAllAdmin : (req,res)=>{
    db.Admin.findAll()
    .then((value)=>{
      res.status(200).json({
        message: 'kirim semua data admin',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'terjadi kesalahan saat mengambil data admin'
      })
    })
  },

  getAdminById : (req,res)=>{
    db.Admin.findOne({
      where:{
        id: req.params.id
      },
      include:[
        db.Community
      ]
    })
    .then((value)=>{
      res.status(200).json({
        message: ' berhasil kirim data admin personal',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'terjadi kesalahan saat mengambil data admin satuan'
      })
    })
  },

  editData : (req,res)=>{
    db.Admin.update(
      req.body,{where:{id:req.params.id}}
    )
    .then((value)=>{
      res.status(200).json({
        message:'berhasil update data admin',
        value
      })
      .catch((err)=>{
        res.status(400).json({
          message: 'terjadi kesalahan saat mengupdate data admin'
        })
      })
    })
  },

  deleteData : (req,res)=>{
    db.User.destroy({
      where:{
        id:req.params.id
      }
    })
    .then((value)=>{
      res.status(200).json({
        message: 'berhasil delete data admin',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'gagal delete data admin'
      })
    })
  }

}