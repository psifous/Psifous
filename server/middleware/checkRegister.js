const db = require('../models')

module.exports = {
  checkUser:(req,res,next)=>{
    db.Admin.findOne({
      where:{
        email : req.body.email
      }
    })
    .then((value)=>{
      if(value === null){
        next()
      }else{
        res.status(400).json({
          message: 'email sudah terdaftar'
        })
      }
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'terjadi kesalahan saat mendaftar'
      })
    })
  },

  checkAdmin:(req,res,next)=>{
    db.User.findOne({
      where:{
        email :req.body.email
      }
    })
    .then((value)=>{
      if(value === null){
        next()
      }else{
        res.status(400).json({
          message: 'email sudah terdaftar'
        })
      }
    })
    .catch((err)=>{
      res.status(400).json({
        message: 'terjadi kesalahan saat mendaftar'
      })
    })
  }
}