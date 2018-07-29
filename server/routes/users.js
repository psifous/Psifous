const express = require('express');
const router = express.Router();
const {
  register,
  getAllUser,
  getUserById,
  editData,
  deleteData,
  getUserInfo
} = require('../controller/userController');
const { checkUser } = require('../middleware/checkRegister');

/* GET users listing. */
router.post('/', checkUser, register);
router.get('/', getAllUser);
router.get('/me', getUserInfo);
router.get('/:id', getUserById);
router.put('/:id', editData);
router.delete('/:id', deleteData);

module.exports = router;
