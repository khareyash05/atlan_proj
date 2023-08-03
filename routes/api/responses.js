const express = require('express');
const router = express.Router();

const {
    createResponse,
    deleteResponse,
} = require('../../controllers/responseController')

router.post('/create', createResponse);
router.delete('/delete/:id', deleteResponse);

module.exports = router