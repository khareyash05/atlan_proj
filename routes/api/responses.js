const express = require('express');
const router = express.Router();

const {
    createResponse,
    deleteResponse,
    integrateSheets
} = require('../../controllers/responseController')

router.post('/create', createResponse);
router.delete('/delete/:id', deleteResponse);
router.post('/integrate/:id',integrateSheets)

module.exports = router