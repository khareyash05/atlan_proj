const express = require('express');
const router = express.Router();

const {
    integrateSheets,
    generateGraph
} = require('../../controllers/graphController');

router.post('/integrate/:id', integrateSheets);
router.post('/generate/:id', generateGraph);

module.exports = router