const express = require('express');
const router = express.Router();

const {
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require("../../controllers/questionController")

router.post('/create', createQuestion);
router.put('/update/:id', updateQuestion);
router.delete('/delete/:id', deleteQuestion);

module.exports = router