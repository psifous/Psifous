const express = require('express');
const router = express.Router();
const { createElection, updateElection, getAllElection, getOneElection, deleteElection } = require('../controller/electionController')

router.post('/',createElection)
router.get('/',getAllElection);
router.get('/:id',getOneElection)
router.put('/:id',updateElection)
router.delete('/:id',deleteElection)


module.exports = router;
