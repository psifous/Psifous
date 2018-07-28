const express = require('express');
const router = express.Router();
const photo = require('../middleware/upload')
const { register,getAllCandidate,getCandidate,updateCandidate,deleteCandidate } = require('../controller/candidateController')


router.post('/', photo.multer.single('image'), photo.upload, register);
router.get('/',getAllCandidate);
router.get('/:id',getCandidate)
router.put('/:id',updateCandidate)
router.delete('/:id',deleteCandidate)


module.exports = router;
