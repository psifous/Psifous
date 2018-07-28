const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.end('Connect to Index JS Psifous')
})

module.exports = router