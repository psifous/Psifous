const db = require('../models')

module.exports={
  createConjunction:(req,res)=>{
    db.CommunityUser.create({
      UserId : req.body.UserId,
      CommunityId : req.body.CommunityId
    })
    .then((value)=>{
      res.status(200).json({
        message:'berhasil gabung ke komunitas',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal gabung ke komunitas',
        err
      })
    })
  },
  deleteConjunction:(req,res)=>{
    db.CommunityUser.delete({where:{
      UserId: req.body.UserId , CommunityId : req.body.CommunityId
    }})
    .then((value)=>{
      res.status(200).json({
        message:'berhasil delete data conjunction',
        value
      })
    })
    .catch((err)=>{
      res.status(400).json({
        message:'gagal delete data conjunction',
        err
      })
    })
  }
}
