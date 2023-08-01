const express = require('express');
const router = express.Router();

const {createAnswer,updateAnswer,deleteAnswer} = require('../../controllers/answerController');

router.post('/create', createAnswer);
router.put('/update/:id', updateAnswer);
router.delete('/delete/:id', deleteAnswer);

module.exports = router