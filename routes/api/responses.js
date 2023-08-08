const express = require('express');
const router = express.Router();

const {
    createResponse,
    deleteResponse,
    checkResponse,
    submitEvaluation
} = require('../../controllers/responseController')

router.post('/create', createResponse);
router.get('/get/:id/',checkResponse);
router.post('/get/:id/:userId',submitEvaluation)
router.delete('/delete/:id', deleteResponse);

module.exports = router