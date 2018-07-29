const express = require('express');
const router = express.Router();

const {
  checkLogin,
  verify,
  checking
} = require('../controller/loginController');

router.post('/login', checkLogin);
router.post('/verify', verify);
router.post('/checking', checking);

module.exports = router;
