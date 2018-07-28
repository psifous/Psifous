const express = require('express');
const router = express.Router();
const {createCommunity,getCommunityData,deleteData,updateData,getOneCommunity} = require('../controller/communityController')

router.post('/',createCommunity)
router.get('/',getCommunityData);
router.get('/:id',getOneCommunity)
router.put('/:id',updateData)
router.delete('/:id',deleteData)


module.exports = router;
