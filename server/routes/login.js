const express = require('express');
const router = express.Router();
const { checkLogin } = require('../controller/loginController')

router.post('/',checkLogin)


module.exports = router;
