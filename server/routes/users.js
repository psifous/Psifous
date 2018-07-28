var express = require('express');
var router = express.Router();
var { register, getAllUser,getUserById,editData,deleteData } = require('../controller/userController')

/* GET users listing. */
router.post('/', register);
router.get('/',getAllUser);
router.get('/:id',getUserById)
router.put('/:id',editData)
router.delete('/:id',deleteData)


module.exports = router;
