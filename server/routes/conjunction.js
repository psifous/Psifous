const express = require('express');
const router = express.Router();
const { createConjunction,deleteConjunction } = require('../controller/conjunctionController')


router.post('/',createConjunction)
router.delete('/',deleteConjunction)


module.exports = router;
