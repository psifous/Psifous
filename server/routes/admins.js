var express = require('express');
var router = express.Router();
var { register, getAdminById, getAllAdmin, editData, deleteData } = require('../controller/adminController')
const { checkAdmin } = require('../middleware/checkRegister')

/* GET users listing. */
router.post('/',checkAdmin, register);
router.get('/',getAllAdmin);
router.get('/:id',getAdminById)
router.put('/:id',editData)
router.delete('/:id',deleteData)


module.exports = router;
