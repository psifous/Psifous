const db = require('../models')

module.exports = {
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
}