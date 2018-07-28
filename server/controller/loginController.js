const db = require('../models')
const hashPassword = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')

module.exports={
  checkLogin : (req,res)=>{
    db.User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then((valueUser)=>{
      if(valueUser === null){
        db.Admin.findOne({
          where:{
            email:req.body.email
          }
        })
        .then((valueAdmin)=>{
          if(valueAdmin === null){
            res.status(400).json({
              message:'email atau password yang kamu masukan salah'
            })
          }else{
            if(hashPassword(req.body.password,valueAdmin.password)){
              let token = jwt.sign({id:valueAdmin.id,email:valueAdmin.email,first_name: valueAdmin.first_name,last_name:valueAdmin.last_name},'secret')
              res.status(200).json({
                message:'sukses login admin',
                token
              })
            }else{
              res.status(400).json({
                message:'email atau password yang kamu masukan salah'
              })
            }
          }
        })
      }else{
        if(hashPassword(req.body.password,valueUser.password)){
          let token = jwt.sign({id:valueUser.id,email:valueUser.email,first_name: valueUser.first_name,last_name:valueUser.last_name},'secret')
          res.status(200).json({
            message:'sukses login user',
            token
          })
        }else{
          res.status(400).json({
            message:'email atau password yang kamu masukan salah'
          })
        }
      }
    })
    .catch((err)=>{
      res.status(400).json({
        message:'terjadi kesalahan',
        err
      })
    })
  }
}