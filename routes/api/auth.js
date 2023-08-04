const express = require('express');
const router = express.Router();

const {
    registerAdmin,
    registerUser
} = require('../../controllers/authController')

router.get('/admin',registerAdmin);
router.get('/user',registerUser);

module.exports = router